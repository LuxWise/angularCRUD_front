import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'; // importa el environment

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(user: string, password: string) {
    const url = `/api/auth/login`;
    const headers = {
      'Content-Type': 'application/json',
    };

    return this.http.post<any>(
      url,
      { email: user, password: password },
      { headers }
    );
  }
}
