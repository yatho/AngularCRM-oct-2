import { Component, inject } from '@angular/core';
import { AuthenticationService } from './login/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angularCRM-19';

  protected authent = inject(AuthenticationService);
  private router = inject(Router);

  clicked(label: string) {
    console.log('The button was clicked', label);
  }

  disconnect(): void {
    this.authent.disconnect();
    this.router.navigate(['/login']);
  }
}
