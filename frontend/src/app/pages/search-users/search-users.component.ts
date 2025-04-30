// search-users.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.css'],
  standalone:false,
})
export class SearchUsersComponent {
  searchQuery: string = '';
  users: any[] = [];
  token = localStorage.getItem('access_token')!;

  constructor(private http: HttpClient, private router: Router) {}

  onSearch() {
    const q = this.searchQuery.trim();
    if (!q) {
      this.users = [];
      return;
    }
    this.http
      .get<{ user_id: number; user_name: string }[]>(`http://localhost:8000/api/auth/search/?q=${q}`)
      .subscribe({
        next: data => this.users = data,
        error: () => this.users = []
      });
  }
  goChat(username: string) {
    // điều hướng đến /chat/:receiver
    this.router.navigate(['/chat', username]);
  }
}
