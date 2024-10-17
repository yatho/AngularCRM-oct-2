import { TestBed } from '@angular/core/testing';

import {
  AuthenticationService,
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
} from './authentication.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for authenticated when currentUser is set', () => {
    service['currentUser'] = {
      id: 1,
      login: 'test',
      lastname: 'User',
      firstname: 'Test',
    };
    expect(service.authenticated).toBeTrue();
  });

  it('should return false for authenticated when currentUser is not set', () => {
    service['currentUser'] = undefined;
    expect(service.authenticated).toBeFalse();
  });

  it('should return the correct token when jwtToken is set', () => {
    service['jwtToken'] = 'test-token';
    expect(service.token).toBe('test-token');
  });

  it('should return undefined for token when jwtToken is not set', () => {
    service['jwtToken'] = undefined;
    expect(service.token).toBeUndefined();
  });

  it('should authenticate user and set currentUser and jwtToken', (done) => {
    const mockResponse = {
      user: { id: 1, login: 'test', lastname: 'User', firstname: 'Test' },
      token: 'test-token',
    };

    spyOn(httpMock, 'post').and.returnValue(of(mockResponse));

    service.authentUser('test', 'password').subscribe((user) => {
      expect(user).toEqual(mockResponse.user);
      expect(service['currentUser']).toEqual(mockResponse.user);
      expect(service['jwtToken']).toBe(mockResponse.token);
      expect(sessionStorage.getItem(USER_STORAGE_KEY)).toBe(
        JSON.stringify(mockResponse.user)
      );
      expect(sessionStorage.getItem(TOKEN_STORAGE_KEY)).toBe(
        mockResponse.token
      );
      done();
    });
  });

  it('should clear currentUser and jwtToken on disconnect', () => {
    service['currentUser'] = {
      id: 1,
      login: 'test',
      lastname: 'User',
      firstname: 'Test',
    };
    service['jwtToken'] = 'test-token';
    sessionStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify(service['currentUser'])
    );
    sessionStorage.setItem(TOKEN_STORAGE_KEY, service['jwtToken']);

    service.disconnect();

    expect(service['currentUser']).toBeUndefined();
    expect(service['jwtToken']).toBeUndefined();
    expect(sessionStorage.getItem(USER_STORAGE_KEY)).toBeNull();
    expect(sessionStorage.getItem(TOKEN_STORAGE_KEY)).toBeNull();
  });
});
