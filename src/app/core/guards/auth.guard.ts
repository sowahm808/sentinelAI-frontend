import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Permission } from '../auth/auth.models';
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.authenticated() || inject(Router).createUrlTree(['/login']);
};
export const permissionGuard =
  (permission: Permission): CanActivateFn =>
  () => {
    const auth = inject(AuthService);
    return auth.hasPermission(permission) || inject(Router).createUrlTree(['/unauthorized']);
  };
