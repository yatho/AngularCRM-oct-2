import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Consumer = {
  id?: number;
  civility: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
};

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  private http = inject(HttpClient);

  getList(filter?: string): Observable<Consumer[]> {
    if (!!filter) {
      const queryParam = new HttpParams().append('q', filter);
      return this.http.get<Consumer[]>('/api/consumers', {
        params: queryParam,
      });
    }
    return this.http.get<Consumer[]>('/api/consumers');
  }

  get(id: number): Observable<Consumer> {
    return this.http.get<Consumer>(`/api/consumers/${id}`);
  }

  create(consumer: Consumer): Observable<Consumer> {
    return this.http.post<Consumer>('/api/consumers', consumer);
  }

  update(consumer: Consumer): Observable<Consumer> {
    return this.http.put<Consumer>(`/api/consumers/${consumer.id}`, consumer);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/consumers/${id}`);
  }
}
