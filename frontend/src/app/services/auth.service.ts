import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/auth/register/'; // Địa chỉ API backend Django

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
  private baseUrl = 'http://localhost:8000/api/auth/'; // Đúng link Django



  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login/`, { username, password });
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
  }
}
