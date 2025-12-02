import { Injectable, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  // Signal for loading state
  readonly isLoading = signal<boolean>(false);

  constructor(private router: Router) {
    // Subscribe to router events to show/hide loader during navigation
    this.router.events
      .pipe(
        filter(
          event => event instanceof NavigationStart || event instanceof NavigationEnd
        )
      )
      .subscribe(event => {
        // Show loader on navigation start
        if (event instanceof NavigationStart) {
          this.showLoader();

          // Hide loader after a short delay to ensure it's visible
          setTimeout(() => {
            this.hideLoader();
          }, 1000); // Show loader for 1 second
        }

        // Hide loader on navigation end
        if (event instanceof NavigationEnd) {
          this.hideLoader();
        }
      });
  }

  /**
   * Show the global loader
   */
  showLoader(): void {
    this.isLoading.set(true);
  }

  /**
   * Hide the global loader
   */
  hideLoader(): void {
    this.isLoading.set(false);
  }
}
