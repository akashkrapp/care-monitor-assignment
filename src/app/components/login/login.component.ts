import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { LoginCredentials } from '../../models/interfaces';
import { ValidationMessages, PasswordValidation, SnackbarActions } from '../../models/enums';
import { ROUTES } from '../../constants/routes.constants';
import { AUTH_SUCCESS_MESSAGES } from '../../constants/auth.constants';
import { UI_LABELS, UI_PLACEHOLDERS } from '../../constants/ui.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  loginForm: FormGroup;
  readonly isLoading = this.authService.isLoading;
  readonly error = this.authService.error;

  // UI Constants
  readonly labels = UI_LABELS;
  readonly placeholders = UI_PLACEHOLDERS;
  readonly validationMessages = ValidationMessages;

  constructor() {
    // Redirect if already authenticated
    if (this.authService.checkIsAuthenticated()) {
      this.router.navigate([ROUTES.DASHBOARD]);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(PasswordValidation.MIN_LENGTH)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.value as LoginCredentials;
      this.authService.login(credentials).subscribe({
        next: () => {
          this.snackBar.open(
            AUTH_SUCCESS_MESSAGES.LOGIN_SUCCESS,
            SnackbarActions.CLOSE,
            {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            }
          );
        },
        error: (err: unknown) => {
          // Error is already handled in the service
          console.error('Login error:', err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

