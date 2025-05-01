import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Role {
  role_id: number;
  role_name: string;
  deception: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl= 'http://localhost:8000/api/roles/';

  constructor(private http: HttpClient) { }

  getRole(): Observable<any> {
    return this.http.get<Role[]>(this.apiUrl);
  }
}
