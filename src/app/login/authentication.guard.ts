import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  if (!inject(AuthenticationService).authenticated)
    return inject(Router).parseUrl('/login');
  return true;
};
