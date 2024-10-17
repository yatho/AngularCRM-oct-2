import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { authenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';

describe('authenticationGuard', () => {
  let mockAuthService = jasmine.createSpyObj('AuthenticationService', [
    'authenticated',
  ]);
  let mockRouter = jasmine.createSpyObj('Router', ['parseUrl']);

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      authenticationGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is authenticated', () => {
    mockAuthService.authenticated = true;
    expect(
      executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    ).toBeTrue();
  });

  it('should redirect to /login if user is not authenticated', () => {
    mockAuthService.authenticated = false;
    mockRouter.parseUrl.and.returnValue('/login');
    expect(
      executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    ).toEqual(mockRouter.parseUrl('/login'));
  });
});
