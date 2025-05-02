import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService, Message } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone:false,
})
export class ChatComponent implements OnInit, OnDestroy {
  chatId!: number;
  userId!: number; // Có thể lấy từ auth service sau này
  messages: Message[] = [];
  newText = '';
  private subs: Subscription[] = [];
  token = localStorage.getItem('access_token')!;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private http : HttpClient
  ) {}

  ngOnInit(): void {
    this.chatId = +(this.route.snapshot.paramMap.get('chatId') ?? 0);
    this.chatService.connect(this.chatId);
    
    // Bắt đầu từ đây: chỉ khi có userId mới xử lý tiếp
    this.http.get<any>(`http://localhost:8000/api/auth/get-user_id/?access_token=${this.token}`)
      .subscribe(currentUser => {
        this.userId = currentUser.user_id;
        
        // Lúc này mới fetch lịch sử chat
        this.chatService.fetchHistory(this.chatId).subscribe(
          (response: any) => {
            this.messages = response.messages;
          },
          error => console.error('Error fetching messages:', error)
        );
  
        // Lúc này mới lắng nghe tin nhắn WebSocket
        this.subs.push(
          this.chatService.onMessage().subscribe(msg => {
            console.log('Received WS message:', msg);
            console.log('Current userId:', this.userId);
            this.messages.push(msg);
          })
        );
      });
  }
  

  ngOnDestroy(): void {
    this.chatService.disconnect();
    this.subs.forEach(s => s.unsubscribe());
  }

  send(): void {
    
    if (this.newText.trim()) {
      this.chatService.sendMessage(this.chatId, this.userId, this.newText);
    }
    this.newText = '';
  }

  clearChat(): void {
    this.chatService.deleteChat(this.chatId);
    this.subs.push(
      this.chatService.onDeleteResponse().subscribe(success => {
        if (success) {
          this.messages = [];
        }
      })
    );
  }
}
