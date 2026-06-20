import { CanActivateFn, Router } from '@angular/router';
import { ROLE } from '../interfaces';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';

export const Authorize = (...roles: ROLE[]): CanActivateFn => {
  return (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);

    // checking session
    const isAuthenticated = auth.checkSession();

    if (!isAuthenticated) {
      return router.parseUrl('/auth/login');
    }

    const requestRole = auth.user?.role;

    if (!requestRole || !roles.includes(requestRole)) {
      return router.parseUrl('/task-management/task-list');
    }

    return true
  }
}
