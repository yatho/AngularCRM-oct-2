import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  protected loginForm = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, checkPassword]),
  });

  protected onSubmit(): void {
    console.log('submit');
    // ...
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
