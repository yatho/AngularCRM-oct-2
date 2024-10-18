import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemoObservableService {
  getObservable(): Observable<number> {
    return new Observable<number>((subscriber: Subscriber<number>) => {
      // Send results
      setTimeout(() => {
        subscriber.next(1);
      }, 1000);
      setTimeout(() => {
        subscriber.next(2);
      }, 2000);
      setTimeout(() => {
        subscriber.next(3);
      }, 3000);

      // End of processing
      setTimeout(() => {
        subscriber.complete();
      }, 50000);
    });
  }
}
