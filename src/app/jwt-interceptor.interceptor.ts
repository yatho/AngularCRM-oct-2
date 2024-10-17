import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from './login/authentication.service';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const jwtToken = authService.token;
  // httpRequest is immutable, it must be cloned
  const clone = req.clone({
    setHeaders: { Authorization: `Bearer ${jwtToken}` },
  });
  return next(clone);
};
