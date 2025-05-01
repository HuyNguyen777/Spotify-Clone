import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket!: WebSocket;
  private messageCallback: ((msg: any) => void) | null = null;
  constructor(private http : HttpClient){}
  connect(receiver: number) {
    this.socket = new WebSocket(`ws://localhost:8000/ws/chat/${receiver}/`);
  
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (this.messageCallback) this.messageCallback(data);
    };
  
    this.socket.onopen = () => {
      console.log('WebSocket connection opened');
    };
  
    this.socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };
  
    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }
  

  // chat.service.ts
onMessage(callback: (msg: any) => void): void {
  this.socket.onmessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.message_type === 'create_chat_response') {
      const msg = {
        message: data.message_text,
        sender: data.sender_id,
        time: data.time,
        date: data.date,
        is_read: data.is_read,
        chat_id: data.chat_id,
        id: data.id
      };
      callback(msg);
    }
  };
}


sendMessage(message: {
  message_text: string;
  sender_id: number;
  chat_id: number;
}) {
  if (this.socket && this.socket.readyState === WebSocket.OPEN) {
    this.socket.send(
      JSON.stringify({
        command: 'send_message',
        ...message,
      })
    );
  } else {
    console.error('WebSocket is not connected.');
  }
}

close() {
  this.socket?.close();
}

  getChatHistory(chatId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8000/api/chat/${chatId}/messages/`);
  }
  
}
