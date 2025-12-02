import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  template: `
    <div class="global-loader" *ngIf="isLoading()">
      <mat-progress-bar mode="indeterminate" color="primary"></mat-progress-bar>
    </div>
  `,
  styles: [`
    .global-loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 9999;
    }

    mat-progress-bar {
      height: 4px;
    }
  `]
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);
  isLoading = this.loaderService.isLoading as () => boolean;
}
