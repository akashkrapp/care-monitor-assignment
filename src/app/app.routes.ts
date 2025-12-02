import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { ROUTE_CONFIG, ROUTES } from './constants/routes.constants';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DevelopmentComponent } from './components/development/development.component';

export const routes: Routes = [
  {
    path: ROUTE_CONFIG.LOGIN.path,
    loadComponent: ROUTE_CONFIG.LOGIN.loadComponent
  },
  {
    path: ROUTE_CONFIG.DASHBOARD.path,
    loadComponent: ROUTE_CONFIG.DASHBOARD.loadComponent,
    canActivate: [authGuard]
  },
  {
    path: ROUTE_CONFIG.LIST.path,
    loadComponent: ROUTE_CONFIG.LIST.loadComponent,
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    component: DevelopmentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'settings',
    component: DevelopmentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'reports',
    component: DevelopmentComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: ROUTES.LOGIN,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
