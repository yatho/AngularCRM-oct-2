import { Component, inject, OnDestroy } from '@angular/core';
import { DemoObservableService } from './common/demo-observable.service';
import { catchError, map, Subscription, take, tap, throwError } from 'rxjs';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angularCRM-19';

  // private osbService = inject(DemoObservableService);

  // protected testObs = this.osbService.getObservable().pipe(
  //   map((x) => x * 10), // Transformation of the result
  //   tap((x) => console.log('Value received:', x)),
  //   catchError((err) => {
  //     return throwError(() => err);
  //   })
  // );

  clicked(label: string) {
    console.log('The button was clicked', label);
  }
}
