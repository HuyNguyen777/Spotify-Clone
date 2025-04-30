import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const roleId = parseInt(localStorage.getItem('role_id') || '0', 10);
  return roleId === 1;
};
