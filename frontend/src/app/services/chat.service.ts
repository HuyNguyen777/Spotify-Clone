import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { combineLatest, Observable, Subject } from 'rxjs';

export interface Message {
  id: number;
  sender_id: number;
  chat_id: number;
  message_text: string;
  created_at: string;
  date: string;
  time: string;
  isRead: boolean;
}
export interface Chat {
  id: number;
  user1_id: number;
  user2_id: number;
  timestamp: string;
  
}
@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket!: WebSocket;
  private messages$ = new Subject<Message>();
  private deleteResponses$ = new Subject<boolean>();

  private baseUrl = 'http://127.0.0.1:8000/api/chat/';

  constructor(private http: HttpClient) {}

  connect(chatId: number): void {
    this.socket = new WebSocket(`ws://localhost:8000/ws/chat/${chatId}/`);

    this.socket.onopen = () => {
      // WebSocket kết nối thành công
      console.log('WebSocket connected successfully');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message_type === 'create_chat_response') {
        this.messages$.next(data as Message);
      } else if (data.message_type === 'delete_chat_response') {
        this.deleteResponses$.next(data.success);
      }
    };

    this.socket.onerror = (error) => {
      // Lỗi khi kết nối WebSocket
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      // WebSocket đóng kết nối
      console.log('WebSocket closed');
    };
  }


  disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  // chat.service.ts
  sendMessage(chatId: number, senderId: number, text: string): void {
    const trimmedText = text.trim();
    if (!trimmedText) return;
  
    const payload = {
      command: 'new_message',  // Phải khớp với consumers.py
      chat_id: chatId,
      sender_id: senderId,
      message_text: trimmedText,
    };
  
    this.socket.send(JSON.stringify(payload));
  }
  
  
  

  deleteChat(chatId: number): void {
    this.socket.send(JSON.stringify({
      command: 'delete_chat',
      chat_id: chatId
    }));
  }

  onMessage(): Observable<Message> {
    return this.messages$.asObservable();
  }

  onDeleteResponse(): Observable<boolean> {
    return this.deleteResponses$.asObservable();
  }

  fetchHistory(chatId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`http://localhost:8000/api/chat/${chatId}/messages/`);
  }
  private apiUrl = 'http://localhost:8000/api/chat/get-user-chats/';

  getUserChats(currentUserID: number): Observable<any> {
    return this.http.get<Chat>(`${this.apiUrl}${currentUserID}/`);
  }

  listChat(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.baseUrl);
  }

}
