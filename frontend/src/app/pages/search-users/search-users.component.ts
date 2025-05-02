// search-users.component.ts
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { ChatService } from '../../services/chat.service';
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
  currentuser!: number;
  chattedUsers: { user_id: number; user_name: string }[] = [];
  chats: any[] = [];

  constructor(private http: HttpClient, private router: Router,private chatService: ChatService) {}
  ngOnInit(): void {
    
    this.getUserChats();
  }
  onSearch() {
    const q = this.searchQuery.trim();
    if (!q) {
      this.users = [];
      return;
    }
  
    // Lấy user_id của người dùng hiện tại
    this.http.get<any>(`http://localhost:8000/api/auth/get-user_id/?access_token=${this.token}`)
      .subscribe(currentUser => {
        this.currentuser = currentUser.user_id;
  
        // Sau khi nhận được currentuser, thực hiện tìm kiếm
        this.http
          .get<{ user_id: number; user_name: string }[]>(
            `http://localhost:8000/api/auth/search/?q=${q}&exclude=${this.currentuser}`
          )
          .subscribe({
            next: data => this.users = data,
            error: () => this.users = []
          });
      });
  }
  
  /*goChat(username: string) {
    // điều hướng đến /chat/:receiver
    this.router.navigate(['/chat', username]);
  }*/
    goChat(userid: number) {
      this.http.get<any>(`http://localhost:8000/api/auth/get-user_id/?access_token=${this.token}`)
        .subscribe(currentUser => {
          const currentUserId = currentUser.user_id;
          // B1: Kiểm tra chat đã tồn tại chưa
          this.http.get<any>('http://localhost:8000/api/chat/check/', {
            params: {
              user1_id: currentUserId,
              user2_id: userid
            }
          }).subscribe(checkRes => {
            if (checkRes.exists) {
              this.router.navigate(['/chat', checkRes.chat_id]);
           
            } else {
              // chưa có → gọi API tạo chat mà không cần token
              this.http.post<any>('http://localhost:8000/api/chat/create_chat/', {
                user1_id: currentUserId,
                user2_id: userid,
              }).subscribe(createRes => {
                this.router.navigate(['/chat', createRes.id]);  // điều hướng đến đoạn chat mới
              });
            }
            
          });
        });
    }
    getUserChats() {
      this.http.get<any>(`http://localhost:8000/api/auth/get-user_id/?access_token=${this.token}`)
        .subscribe({
          next: currentUser => {
            const currentid = currentUser.user_id;
    
            this.http.get<any>('http://localhost:8000/api/chat/get-user-chats/', {
              params: { user: currentid }
            }).subscribe({
              next: data => {
                this.chats = data;
                console.log('Fetched chats:', this.chats);
              },
              error: err => console.error('Error fetching chats:', err)
            });
    
          },
          error: err => console.error('Error getting user id:', err)
        });
    }
    
    
    
}
