import { inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTES } from '../constants/routes.constants';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.checkIsAuthenticated()) {
    return true;
  }

  // Redirect to login page if not authenticated
  router.navigate([ROUTES.LOGIN], { queryParams: { returnUrl: state.url } });
  return false;
};

