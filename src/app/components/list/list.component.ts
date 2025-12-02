import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { ListService } from '../../services/list.service';
import { SnackbarActions } from '../../models/enums';
import { LIST_SUCCESS_MESSAGES, LIST_ERROR_MESSAGES, LIST_SNACKBAR_CONFIG } from '../../constants/list.constants';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly listService = inject(ListService);
  private readonly snackBar = inject(MatSnackBar);

  // Use Signal Store from service
  readonly items = this.listService.items;
  readonly isLoading = this.listService.loading;
  readonly error = this.listService.error;

  ngOnInit(): void {
    // Fetch items when component initializes
    this.loadItems();
  }

  loadItems(): void {
    this.listService.fetchItems().subscribe({
      next: () => {
        // Success - state is updated via the service
        if (this.items().length > 0) {
          this.snackBar.open(
            LIST_SUCCESS_MESSAGES.ITEMS_LOADED,
            SnackbarActions.CLOSE,
            {
              duration: LIST_SNACKBAR_CONFIG.SUCCESS_DURATION,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            }
          );
        }
      },
      error: () => {
        // Error is handled in the service, but we can show additional feedback
        this.snackBar.open(
          LIST_ERROR_MESSAGES.LOAD_FAILED,
          SnackbarActions.CLOSE,
          {
            duration: LIST_SNACKBAR_CONFIG.ERROR_DURATION,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          }
        );
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  onRetry(): void {
    this.loadItems();
  }
}

