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
  receiver!: string;
  currentUser!: string;
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
  
    this.receiver = this.route.snapshot.paramMap.get('receiver')!;
  
    if (this.token && this.receiver) {
      // Connect to WebSocket
      this.chatService.connect( this.receiver);
  
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
    if (!this.newMessage.trim()) return;
    this.chatService.sendMessage(this.newMessage, this.receiver);
    this.messages.push({ message: this.newMessage, sender: this.currentUser });
    this.newMessage = '';
    setTimeout(() => this.scrollToBottom(), 100);
  }

  private scrollToBottom() {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }
}
