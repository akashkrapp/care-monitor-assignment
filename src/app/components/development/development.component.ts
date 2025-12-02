import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-development',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="development-container responsive-container">
      <mat-card class="development-card">
        <mat-card-header>
          <mat-icon mat-card-avatar>construction</mat-icon>
          <mat-card-title>Page Under Development</mat-card-title>
          <mat-card-subtitle>This feature is coming soon</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="development-content">
            <mat-icon class="development-icon">build</mat-icon>
            <p>The page you are trying to access is currently under development.</p>
            <p>Please check back later or navigate to an available page.</p>
          </div>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-raised-button color="primary" (click)="navigateToList()">
            Go to List Page
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .development-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    .development-card {
      max-width: 500px;
      width: 100%;
    }

    .development-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px 0;
    }

    .development-icon {
      font-size: 64px;
      height: 64px;
      width: 64px;
      color: #3f51b5;
      margin-bottom: 20px;
    }

    p {
      margin: 8px 0;
    }
  `]
})
export class DevelopmentComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly commonService = inject(CommonService);

  ngOnInit(): void {
    // Show the under development message
    this.commonService.showUnderDevelopmentMessage(this.router.url);
  }

  navigateToList(): void {
    this.router.navigate(['/list']);
  }
}
