import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../services/auth.service';
import { provideZonelessChangeDetection } from '@angular/core';
import { signal } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const mockAuthService = jasmine.createSpyObj('AuthService', ['logout', 'getUserEmail'], {
    currentUser: signal({ email: 'test@example.com' })
  });

  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    authService.getUserEmail.and.returnValue('test@example.com');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have currentUser signal from authService', () => {
    expect(component.currentUser).toBeDefined();
  });

  it('should have userEmail from authService', () => {
    expect(component.userEmail).toBe('test@example.com');
  });

  it('should call authService.logout when onLogout is called', () => {
    component.onLogout();

    expect(authService.logout).toHaveBeenCalled();
  });

  it('should display user email in template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const userEmailElement = compiled.querySelector('.user-email');

    expect(userEmailElement).toBeTruthy();
    if (userEmailElement) {
      expect(userEmailElement.textContent).toContain('test@example.com');
    }
  });
});

