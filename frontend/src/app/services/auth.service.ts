import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  saveRole(role: number){
    localStorage.setItem('role', role.toString());
  }

  getRoleId(): number | null{
    const roleid = localStorage.getItem('role');
    return roleid ? parseInt(roleid, 10) : null;
  }

  isAdmin(): boolean {
    return this.getRoleId() === 1;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');

  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');  // hoặc sessionStorage  
  }
  getUserByToken(token: string): Observable<any> {
    const params = new HttpParams().set('access_token', token);
    return this.http.get<any>(`${this.baseUrl}get-user`, { params });
  }
}
