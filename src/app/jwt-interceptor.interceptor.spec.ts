import { TestBed } from '@angular/core/testing';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

import { jwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { of } from 'rxjs';
import { AuthenticationService } from './login/authentication.service';

describe('jwtInterceptorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => jwtInterceptorInterceptor(req, next));
  const mockAuthService = jasmine.createSpyObj('AuthenticationService', [
    'token',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthenticationService, useValue: mockAuthService },
      ],
    });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header', () => {
    mockAuthService.token = 'test-token';
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.get('Authorization')).toBe('Bearer test-token');
        return of({} as HttpEvent<any>);
      },
    };

    interceptor(req, next.handle.bind(next)).subscribe();
  });

  it('should pass the request to the next handler', () => {
    mockAuthService.token = 'test-token';
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: jasmine
        .createSpy('handle')
        .and.returnValue(of({} as HttpEvent<any>)),
    };

    interceptor(req, next.handle.bind(next)).subscribe();
    expect(next.handle).toHaveBeenCalledWith(jasmine.any(HttpRequest));
  });
});
