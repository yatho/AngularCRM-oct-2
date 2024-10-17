import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export type User = {
  id: number;
  login: string;
  lastname: string;
  firstname: string;
};

type AuthentResponse = {
  user: User;
  token: string;
};

export const USER_STORAGE_KEY: string = 'angular-crm.user';
export const TOKEN_STORAGE_KEY: string = 'angular-crm.token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUser?: User;
  private jwtToken?: string;
  private http = inject(HttpClient);

  constructor() {
    if (
      sessionStorage.getItem(USER_STORAGE_KEY) !== null &&
      sessionStorage.getItem(TOKEN_STORAGE_KEY) !== null
    ) {
      this.currentUser = JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY)!);
      this.jwtToken = sessionStorage.getItem(TOKEN_STORAGE_KEY)!;
    }
  }

  public get authenticated(): boolean {
    return !!this.currentUser;
  }
  public get token(): string | undefined {
    return this.jwtToken;
  }

  authentUser(login: string, password: string): Observable<User> {
    return this.http
      .post<AuthentResponse>('/api/auth/login', { email: login, password })
      .pipe(
        map((result) => {
          console.log('result', result);

          this.currentUser = result.user;
          this.jwtToken = result.token;

          sessionStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(this.currentUser)
          );
          sessionStorage.setItem(TOKEN_STORAGE_KEY, this.jwtToken);
          return result.user;
        })
      );
  }

  disconnect(): void {
    delete this.currentUser;
    delete this.jwtToken;
    sessionStorage.removeItem(USER_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}
