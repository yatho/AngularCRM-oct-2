import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  protected loginForm = new FormGroup({
    login: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor() {
    this.authenticationService.disconnect();
  }

  protected onSubmit(): void {
    const { login, password } = this.loginForm.getRawValue();
    this.authenticationService
      .authentUser(login, password)
      .pipe(
        catchError((error) => {
          alert('Erreur au cours du login : ' + error.message);
          return [];
        })
      )
      .subscribe((user) => {
        if (!!user) this.router.navigate(['/home']);
      });
  }
}

function checkPassword(c: AbstractControl<string>): ValidationErrors | null {
  if (c.value.length < 5) {
    return {
      checkPassword: 'Error control password',
    };
  }
  return null;
}
