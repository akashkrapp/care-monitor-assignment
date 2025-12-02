import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../components/shared/confirmation-dialog/confirmation-dialog.component';
import { ROUTES } from '../constants/routes.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  /**
   * Show a confirmation dialog
   * @param data Dialog configuration data
   * @returns Observable that resolves to true if confirmed, undefined if canceled
   */
  showConfirmationDialog(data: ConfirmationDialogData): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data,
      disableClose: true
    });

    return dialogRef.afterClosed();
  }

  /**
   * Show a message for pages under development
   * @param route The route that is under development
   */
  showUnderDevelopmentMessage(route: string): void {
    this.snackBar.open(
      `The page "${route}" is currently under development.`,
      'OK',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['development-snackbar']
      }
    );

    // Navigate to list page as it's the only accessible route
    this.router.navigate([ROUTES.LIST]);
  }

  /**
   * Handle navigation to non-existent routes
   * @param url The URL that was attempted to navigate to
   */
  handleInvalidRoute(url: string): void {
    this.snackBar.open(
      `The page "${url}" does not exist.`,
      'OK',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      }
    );

    // Navigate to list page as it's the only accessible route
    this.router.navigate([ROUTES.LIST]);
  }
}
