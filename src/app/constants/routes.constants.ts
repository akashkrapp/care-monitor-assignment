/**
 * Route constants for the application
 */
import { RoutePaths } from '../models/enums';

export const ROUTES = {
  LOGIN: RoutePaths.LOGIN,
  DASHBOARD: RoutePaths.DASHBOARD,
  LIST: RoutePaths.LIST,
  ROOT: RoutePaths.ROOT
} as const;

/**
 * Route configuration for lazy loading
 */
export const ROUTE_CONFIG = {
  LOGIN: {
    path: 'login',
    loadComponent: () => import('../components/login/login.component').then(m => m.LoginComponent)
  },
  DASHBOARD: {
    path: 'dashboard',
    loadComponent: () => import('../components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  LIST: {
    path: 'list',
    loadComponent: () => import('../components/list/list.component').then(m => m.ListComponent)
  }
} as const;

