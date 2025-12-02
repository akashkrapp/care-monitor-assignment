import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Redirecting...</div>`,
  styles: []
})
export class NotFoundComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly commonService = inject(CommonService);

  ngOnInit(): void {
    // Get the URL that was attempted
    const url = this.router.url;

    // Handle the invalid route
    this.commonService.handleInvalidRoute(url);
  }
}
