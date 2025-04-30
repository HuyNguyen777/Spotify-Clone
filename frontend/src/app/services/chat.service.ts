import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket!: WebSocket;
  private messageCallback: ((msg: any) => void) | null = null;

  connect(receiver: string) {
    // Kết nối WebSocket mà không cần token
    this.socket = new WebSocket(`ws://localhost:8000/ws/chat/${receiver}`);

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

  onMessage(callback: (msg: any) => void) {
    this.messageCallback = callback;
  }

  sendMessage(message: string, receiver: string) {
    const msg = { message, receiver };  // Tạo đối tượng tin nhắn
    this.socket.send(JSON.stringify(msg));  // Gửi tin nhắn đã được mã hóa thành JSON
  }
}
