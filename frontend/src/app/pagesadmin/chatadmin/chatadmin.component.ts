import { Component, OnInit } from '@angular/core';
import { Chat, ChatService, Message } from '../../services/chat.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chatadmin',
  standalone: false,
  templateUrl: './chatadmin.component.html',
  styleUrl: './chatadmin.component.css'
})
export class ChatadminComponent implements OnInit {
  
  chatList: any = [];
  messages: Message[] = [];
  nameUser?: string;
  userIdName1: {[key: number]: string} ={};
  userIdName2: {[key: number]: string} = {};
  selectedChat: any = null;
  userId: number = 0;
  
  constructor(public chatService: ChatService, public userService: UserService){}

  Openchat(chat: any){
    this.selectedChat = chat;

    this.chatService.fetchHistory(chat.id).subscribe((res: any) => {
    console.log("Tin nhắn trả về từ API: ", res); 
    console.log("chat id ", chat.id);

    // Nếu API trả về đúng, thì res.messages mới chứa mảng tin nhắn
      if (res && res.messages) {
        this.messages = res.messages;
      } else {
        console.error("Không tìm thấy dữ liệu tin nhắn trong response:", res);
      }
    });

  }

  getSenderName(senderId: number): string {
    if (senderId === this.selectedChat?.user1_id_id) {
      return this.userIdName1[senderId] || 'User 1';
    }
    if (senderId === this.selectedChat?.user2_id_id) {
      return this.userIdName2[senderId] || 'User 2';
    }
    return 'Unknown';
  }

  closePopup() {
    this.selectedChat = null;
    this.messages = [];
  }

deletechat(chat: any) {
  if (confirm(`Bạn có chắc muốn xoá đoạn chat giữa ${this.getNameUser1(chat.user1_id)} và ${this.getNameUser2(chat.user2_id)}?`)) {
    this.chatService.deleteChat(chat.id).subscribe({
      next: () => {
        this.chatList = this.chatList.filter((c: Chat) => c.id !== chat.id);
        if (this.selectedChat?.id === chat.id) {
          this.closePopup();
          this.loadChatList();
        }
        alert('Đã xoá đoạn chat thành công.');
      },
      error: (err) => {
        console.error('Lỗi khi xoá đoạn chat:', err);
        alert('Xoá thất bại. Vui lòng thử lại.');
      }
    });
  }
}

  ngOnInit(): void {
      this.loadChatList();
  }

  loadChatList(){
    this.chatService.listChat().subscribe((chats: any[]) => {
      console.log("Chat List: ", chats);
      this.chatList = chats;

      chats.forEach((chat) => {
        if(chat.user1_id_id && !this.userIdName1[chat.user1_id_id]) {
          this.userService.getUser(chat.user1_id_id).subscribe((res) =>{
            this.userIdName1[chat.user1_id_id] = res.name;
          } )
        }
      })

      chats.forEach((chat) => {
        if(chat.user2_id_id && !this.userIdName2[chat.user2_id_id]) {
          this.userService.getUser(chat.user2_id_id).subscribe((res) => {
            this.userIdName2[chat.user2_id_id] = res.name;
          })
        }
      })

    });


  }

  getNameUser1(userId: number){
   return this.userIdName1[userId] || "undefined";
  }

  getNameUser2(userId: number){
    return this.userIdName2[userId] || "undefined";
  }


  timeStampSlipt(day: string){
    return day.slice(0, 10);
  }
}
