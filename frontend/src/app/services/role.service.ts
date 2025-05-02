import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

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

  getRole(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createRole(role: Omit<Role, 'role_id'>): Observable<Role>{
    return this.http.post<Role>(this.apiUrl, role)
    .pipe(catchError(this.handleError)
    );
  }

  updateRole(id: number, role: any): Observable<any>{
    return this.http.put(`${this.apiUrl}${id}/`, role)
    .pipe(catchError(this.handleError));
  }

  deleteRole(roleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${roleId}/`);
  }

   // Hàm xử lý lỗi chung cho các request
   private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // In ra lỗi để debug
    throw new Error('Something went wrong. Please try again later.');
  }

}
