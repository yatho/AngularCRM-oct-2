import { Component } from '@angular/core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angularCRM-19';

  clicked(label: string) {
    console.log('The button was clicked', label);
  }
}
