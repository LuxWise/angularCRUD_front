import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { To_do } from './models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private apiUrl = '/api/todo';

  constructor(private http: HttpClient) {}

  getAll(): Observable<To_do[]> {
    return this.http.get<To_do[]>(this.apiUrl);
  }

  getById(id: number): Observable<To_do> {
    return this.http.get<To_do>(`${this.apiUrl}/${id}`);
  }

  add(todo: To_do): Observable<To_do> {
    return this.http.post<To_do>(this.apiUrl, todo);
  }

  update(id: number, todo: To_do): Observable<To_do> {
    return this.http.put<To_do>(`${this.apiUrl}/${id}`, todo);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
