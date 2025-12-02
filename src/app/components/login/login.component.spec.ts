import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const mockAuthService = jasmine.createSpyObj('AuthService', ['login', 'checkIsAuthenticated'], {
    isLoading: jasmine.createSpy().and.returnValue({ set: jasmine.createSpy() }),
    error: jasmine.createSpy().and.returnValue({ set: jasmine.createSpy() })
  });

  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;

    // Setup default return values
    authService.checkIsAuthenticated.and.returnValue(false);
    authService.isLoading = jasmine.createSpy().and.returnValue(false);
    authService.error = jasmine.createSpy().and.returnValue(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.email?.value).toBe('');
    expect(component.password?.value).toBe('');
  });

  it('should have required validators on email and password', () => {
    expect(component.email?.hasError('required')).toBe(true);
    expect(component.password?.hasError('required')).toBe(true);
  });

  it('should validate email format', () => {
    component.loginForm.patchValue({ email: 'invalid-email' });
    expect(component.email?.hasError('email')).toBe(true);

    component.loginForm.patchValue({ email: 'valid@email.com' });
    expect(component.email?.hasError('email')).toBe(false);
  });

  it('should validate password minimum length', () => {
    component.loginForm.patchValue({ password: '12345' });
    expect(component.password?.hasError('minlength')).toBe(true);

    component.loginForm.patchValue({ password: '123456' });
    expect(component.password?.hasError('minlength')).toBe(false);
  });

  it('should call authService.login on valid form submission', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    component.loginForm.patchValue(credentials);
    authService.login.and.returnValue(of({ token: 'test-token' }));

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith(credentials);
  });

  it('should not call authService.login on invalid form submission', () => {
    component.loginForm.patchValue({ email: '', password: '' });
    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should mark all fields as touched on invalid submission', () => {
    spyOn(component.loginForm, 'markAllAsTouched');
    component.onSubmit();

    expect(component.loginForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should show success snackbar on successful login', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    component.loginForm.patchValue(credentials);
    authService.login.and.returnValue(of({ token: 'test-token' }));

    component.onSubmit();

    expect(snackBar.open).toHaveBeenCalledWith(
      'Login successful!',
      'Close',
      jasmine.objectContaining({
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      })
    );
  });

  it('should handle login error', () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    component.loginForm.patchValue(credentials);
    authService.login.and.returnValue(throwError(() => ({ error: 'Login failed' })));

    spyOn(console, 'error');
    component.onSubmit();

    expect(console.error).toHaveBeenCalled();
  });

  it('should redirect to dashboard if already authenticated', () => {
    authService.checkIsAuthenticated.and.returnValue(true);
    component = new LoginComponent(
      TestBed.inject(ReactiveFormsModule),
      authService,
      snackBar,
      router
    );

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});

