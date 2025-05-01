// chat.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone:false,
})
export class ChatComponent implements OnInit {
  token!: string;
  receiver!: number;
  currentUser!: number;
  messages: any[] = [];
  newMessage: string = '';

  @ViewChild('messageContainer') messageContainer!: ElementRef;

  private jwtHelper = new JwtHelperService();

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Ensure token and receiver are properly set
    this.token = localStorage.getItem('access_token') || '';
    if (this.token) {
      const decoded = this.jwtHelper.decodeToken(this.token);
      this.currentUser = decoded['user_name'] || decoded['username'] || decoded['user_id']?.toString()!;
    }
  
    this.receiver = Number(this.route.snapshot.paramMap.get('receiver'));
  
    if (this.token && this.receiver) {
      // Connect to WebSocket
      this.chatService.connect(this.receiver);
    /*  this.chatService.getChatHistory(this.receiver).subscribe(history => {
        this.messages = history.map(m => ({
          message: m.message_text,
          sender: m.sender_id,
          time: m.time,
          date: m.date,
          is_read: m.is_read,
          chat_id: m.chat_id,
          id: m.id
        }));
        setTimeout(() => this.scrollToBottom(), 100);
      });*/
      
      // Handle incoming messages
      this.chatService.onMessage(msg => {
        this.messages.push(msg);
        setTimeout(() => this.scrollToBottom(), 100);
      });
      
      
    } else {
      console.error('Invalid token or receiver');
    }
  }
  

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage({
        message_text: this.newMessage,
        sender_id: this.currentUser,
        chat_id: this.receiver,
      });
      this.newMessage = '';
    }
  }
  

  private scrollToBottom() {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }
}
