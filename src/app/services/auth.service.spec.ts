import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService, LoginCredentials, AuthResponse } from './auth.service';
import { provideZonelessChangeDetection } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;
  let cookieService: jasmine.SpyObj<CookieService>;

  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockCookieService = jasmine.createSpyObj('CookieService', ['get', 'set', 'delete']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        provideZonelessChangeDetection(),
        { provide: Router, useValue: mockRouter },
        { provide: CookieService, useValue: mockCookieService }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;

    // Reset spies
    mockRouter.navigate.calls.reset();
    mockCookieService.get.and.returnValue('');
    mockCookieService.set.calls.reset();
    mockCookieService.delete.calls.reset();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkAuthStatus', () => {
    it('should set authenticated to true when token and email exist', () => {
      mockCookieService.get.and.callFake((key: string) => {
        if (key === 'auth_token') return 'test-token';
        if (key === 'user_email') return 'test@example.com';
        return '';
      });

      service = new AuthService();
      expect(service.isAuthenticated()).toBe(true);
      expect(service.currentUser()?.email).toBe('test@example.com');
    });

    it('should set authenticated to false when token or email is missing', () => {
      mockCookieService.get.and.returnValue('');

      service = new AuthService();
      expect(service.isAuthenticated()).toBe(false);
      expect(service.currentUser()).toBeNull();
    });
  });

  describe('login', () => {
    const credentials: LoginCredentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    it('should login successfully and store token', (done) => {
      const mockResponse: AuthResponse = {
        token: 'test-token-123',
        user: {
          email: 'test@example.com',
          name: 'Test User'
        }
      };

      service.login(credentials).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
          expect(service.isAuthenticated()).toBe(true);
          expect(service.currentUser()?.email).toBe('test@example.com');
          expect(mockCookieService.set).toHaveBeenCalledTimes(2);
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
          done();
        }
      });

      const req = httpMock.expectOne('https://reqres.in/api/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(credentials);
      req.flush(mockResponse);
    });

    it('should handle login error', (done) => {
      const errorResponse = {
        error: { error: 'Invalid credentials' }
      };

      service.login(credentials).subscribe({
        next: () => fail('should have failed'),
        error: (err) => {
          expect(service.isLoading()).toBe(false);
          expect(service.error()).toBe('Invalid credentials');
          expect(service.isAuthenticated()).toBe(false);
          done();
        }
      });

      const req = httpMock.expectOne('https://reqres.in/api/login');
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });
    });

    it('should use email from credentials if user email not in response', (done) => {
      const mockResponse: AuthResponse = {
        token: 'test-token-123'
      };

      service.login(credentials).subscribe({
        next: () => {
          expect(mockCookieService.set).toHaveBeenCalledWith(
            'user_email',
            'test@example.com',
            jasmine.any(Number),
            '/',
            '',
            true,
            'Strict'
          );
          done();
        }
      });

      const req = httpMock.expectOne('https://reqres.in/api/login');
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('should clear cookies and redirect to login', () => {
      service.logout();

      expect(mockCookieService.delete).toHaveBeenCalledWith('auth_token', '/');
      expect(mockCookieService.delete).toHaveBeenCalledWith('user_email', '/');
      expect(service.isAuthenticated()).toBe(false);
      expect(service.currentUser()).toBeNull();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('getToken', () => {
    it('should return token from cookie', () => {
      mockCookieService.get.and.returnValue('test-token');
      expect(service.getToken()).toBe('test-token');
    });

    it('should return null when token not found', () => {
      mockCookieService.get.and.returnValue('');
      expect(service.getToken()).toBeNull();
    });
  });

  describe('checkIsAuthenticated', () => {
    it('should return true when token and email exist', () => {
      mockCookieService.get.and.callFake((key: string) => {
        if (key === 'auth_token') return 'test-token';
        if (key === 'user_email') return 'test@example.com';
        return '';
      });

      expect(service.checkIsAuthenticated()).toBe(true);
      expect(service.isAuthenticated()).toBe(true);
    });

    it('should return false when token or email is missing', () => {
      mockCookieService.get.and.returnValue('');
      expect(service.checkIsAuthenticated()).toBe(false);
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('getUserEmail', () => {
    it('should return email from currentUser signal', () => {
      service.currentUser.set({ email: 'test@example.com' });
      expect(service.getUserEmail()).toBe('test@example.com');
    });

    it('should return email from cookie when currentUser is null', () => {
      service.currentUser.set(null);
      mockCookieService.get.and.returnValue('cookie@example.com');
      expect(service.getUserEmail()).toBe('cookie@example.com');
    });

    it('should return null when no email found', () => {
      service.currentUser.set(null);
      mockCookieService.get.and.returnValue('');
      expect(service.getUserEmail()).toBeNull();
    });
  });
});

