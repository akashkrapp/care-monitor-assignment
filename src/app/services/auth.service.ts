import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap, catchError, throwError, finalize, of } from 'rxjs';
import { HttpService } from './http.service';
import { CommonService } from './common.service';
import {
  LoginCredentials,
  AuthResponse,
  UserInfo,
  ApiError,
  ApiErrorDetail
} from '../models/interfaces';
import {
  CookieKeys,
  CookieConfig,
  ApiEndpoints,
  ErrorMessages
} from '../models/enums';
import {
  TEST_CREDENTIALS,
  generateDummyToken,
  getTestUserInfo,
  AUTH_COOKIE_CONFIG,
  API_CONFIG,
  AUTH_ERROR_MESSAGES
} from '../constants/auth.constants';
import { ROUTES } from '../constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpService = inject(HttpService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);
  private readonly commonService = inject(CommonService);

  private readonly TOKEN_KEY = AUTH_COOKIE_CONFIG.TOKEN_KEY;
  private readonly USER_EMAIL_KEY = AUTH_COOKIE_CONFIG.USER_EMAIL_KEY;
  private readonly TOKEN_EXPIRY_DAYS = AUTH_COOKIE_CONFIG.EXPIRY_DAYS;

  // Signals for reactive state management
  readonly isAuthenticated = signal<boolean>(false);
  readonly isLoading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly currentUser = signal<UserInfo | null>(null);

  constructor() {
    // Check if user is already authenticated on service initialization
    this.checkAuthStatus();
  }

  /**
   * Check authentication status from cookie
   */
  private checkAuthStatus(): void {
    const token: string = this.cookieService.get(this.TOKEN_KEY);
    const email: string = this.cookieService.get(this.USER_EMAIL_KEY);

    if (token && email) {
      this.isAuthenticated.set(true);
      this.currentUser.set({ email });
    } else {
      this.isAuthenticated.set(false);
      this.currentUser.set(null);
    }
  }

  /**
   * Login user with email and password
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    this.isLoading.set(true);
    this.error.set(null);

    // Use HttpService which handles both real API and mock data
    return this.httpService.login(credentials).pipe(
      tap((response: AuthResponse) => {
        this.handleLoginSuccess(response, credentials);
      }),
      catchError((err: unknown) => {
        const errorMessage: string = this.extractErrorMessage(err) || AUTH_ERROR_MESSAGES.LOGIN_FAILED;
        this.error.set(errorMessage);
        return throwError(() => err);
      }),
      finalize(() => {
        this.isLoading.set(false);
      })
    );
  }

  /**
   * Mock login for testing (hardcoded credentials)
   */
  private mockLogin(credentials: LoginCredentials): Observable<AuthResponse> {
    // Simulate API delay
    return new Observable<AuthResponse>((observer) => {
      setTimeout(() => {
        // Check hardcoded credentials
        if (
          credentials.email === TEST_CREDENTIALS.email &&
          credentials.password === TEST_CREDENTIALS.password
        ) {
          const dummyToken: string = generateDummyToken();
          const userInfo: UserInfo = getTestUserInfo(credentials.email);

          const mockResponse: AuthResponse = {
            token: dummyToken,
            user: userInfo
          };

          this.handleLoginSuccess(mockResponse, credentials);
          observer.next(mockResponse);
          observer.complete();
        } else {
          this.isLoading.set(false);
          this.error.set(AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS);
          observer.error({ error: AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS });
        }
      }, 500); // Simulate network delay
    });
  }

  /**
   * Handle successful login
   */
  private handleLoginSuccess(response: AuthResponse, credentials: LoginCredentials): void {
    const token: string = response.token;
    const userEmail: string = response.user?.email || credentials.email;
    const userInfo: UserInfo = response.user || getTestUserInfo(userEmail);

    // Store token in cookie
    this.cookieService.set(
      this.TOKEN_KEY,
      token || 'ABCD',
      this.TOKEN_EXPIRY_DAYS,
      AUTH_COOKIE_CONFIG.PATH,
      AUTH_COOKIE_CONFIG.DOMAIN,
      AUTH_COOKIE_CONFIG.SECURE,
      AUTH_COOKIE_CONFIG.SAME_SITE
    );

    // Store user email in cookie
    this.cookieService.set(
      this.USER_EMAIL_KEY,
      userEmail,
      this.TOKEN_EXPIRY_DAYS,
      AUTH_COOKIE_CONFIG.PATH,
      AUTH_COOKIE_CONFIG.DOMAIN,
      AUTH_COOKIE_CONFIG.SECURE,
      AUTH_COOKIE_CONFIG.SAME_SITE
    );

    // Update user info
    this.currentUser.set(userInfo);
    this.isAuthenticated.set(true);
    this.router.navigate([ROUTES.DASHBOARD]);
  }

  /**
   * Logout user - show confirmation dialog, then clear cookies and redirect to login
   */
  logout(): void {
    this.commonService.showConfirmationDialog({
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      confirmText: 'Logout',
      cancelText: 'Cancel'
    }).subscribe(confirmed => {
      if (confirmed) {
        this.cookieService.delete(this.TOKEN_KEY, AUTH_COOKIE_CONFIG.PATH);
        this.cookieService.delete(this.USER_EMAIL_KEY, AUTH_COOKIE_CONFIG.PATH);
        this.isAuthenticated.set(false);
        this.currentUser.set(null);
        this.router.navigate([ROUTES.LOGIN]);
      }
    });
  }

  /**
   * Get authentication token from cookie
   */
  getToken(): string | null {
    const token = this.cookieService.get(this.TOKEN_KEY);
    return token || null;
  }

  /**
   * Check if user is authenticated
   */
  checkIsAuthenticated(): boolean {
    const token = this.getToken();
    const email = this.cookieService.get(this.USER_EMAIL_KEY);
    const authenticated = !!token && !!email;

    if (authenticated && email) {
      this.currentUser.set({ email });
    }

    this.isAuthenticated.set(authenticated);
    return authenticated;
  }

  /**
   * Get current user email
   */
  getUserEmail(): string | null {
    return this.currentUser()?.email || this.cookieService.get(this.USER_EMAIL_KEY) || null;
  }

  /**
   * Extract error message from error object
   */
  private extractErrorMessage(error: unknown): string | null {
    if (error && typeof error === 'object' && 'error' in error) {
      const err: ApiError = error as ApiError;
      if (typeof err.error === 'string') {
        return err.error;
      }
      if (err.error && typeof err.error === 'object') {
        const errorDetail: ApiErrorDetail = err.error as ApiErrorDetail;
        return errorDetail.error || errorDetail.message || null;
      }
    }
    return null;
  }
}

