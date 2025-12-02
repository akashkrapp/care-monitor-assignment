import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CookieKeys } from '../models/enums';
import { AUTH_COOKIE_CONFIG } from '../constants/auth.constants';
import { ROUTES } from '../constants/routes.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the auth token from the cookie
    const token = this.cookieService.get(AUTH_COOKIE_CONFIG.TOKEN_KEY);

    // Clone the request and add the authorization header if token exists
    if (token) {
      request = this.addToken(request, token);
    }

    // Handle the request and catch any errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          // Clear cookies and redirect to login
          this.cookieService.delete(AUTH_COOKIE_CONFIG.TOKEN_KEY, AUTH_COOKIE_CONFIG.PATH);
          this.cookieService.delete(AUTH_COOKIE_CONFIG.USER_EMAIL_KEY, AUTH_COOKIE_CONFIG.PATH);
          this.router.navigate([ROUTES.LOGIN]);
        }

        // Handle 403 Forbidden errors
        if (error.status === 403) {
          // Redirect to dashboard or another appropriate page
          this.router.navigate([ROUTES.DASHBOARD]);
        }

        // Pass the error along
        return throwError(() => error);
      })
    );
  }

  private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
