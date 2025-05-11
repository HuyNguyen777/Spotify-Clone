
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  user_id: number,
  user_name: string,
  passwordhash: string,
  fullname: string,
  birthday: string,
  email: string,
  phone: string,
  image_user: string,
  is_active: boolean,
  role: number,
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/user/'; // đổi theo URL backend thực tế

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

   createUser(formData: FormData) {
    return this.http.post(`${this.apiUrl}create-user/`, formData);
  }

  updateUser(userId: number, formData: FormData){
    return this.http.put(`${this.apiUrl}${userId}/update/`, formData);
  }

  deleteUser(userId: number) {
    return this.http.delete(`${this.apiUrl}${userId}/delete/`);
  }
}
