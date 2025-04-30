import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from users.models import User

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Lấy tên người nhận từ URL
        self.receiver_username = self.scope['url_route']['kwargs']['username']
        self.sender_username = self.scope['user'].username  # Lấy tên người gửi từ session (giả định đã xác thực trước đó)

        # Kiểm tra nếu người nhận có tồn tại hay không
        try:
            self.receiver = await database_sync_to_async(User.objects.get)(username=self.receiver_username)
            # Tạo tên phòng (room) cho chat
            self.room_name = f"chat_{self.receiver_username}"
            self.room_group_name = f"chat_{self.room_name}"

            # Tham gia vào nhóm chat
            await self.accept()
        except User.DoesNotExist:
            await self.close()

    async def disconnect(self, close_code):
        # Đảm bảo ngắt kết nối khi không còn tham gia phòng chat
        await self.close()

    async def receive(self, text_data):
        # Nhận tin nhắn từ người dùng
        data = json.loads(text_data)
        content = data['message']

        # Lưu tin nhắn vào cơ sở dữ liệu
        await database_sync_to_async(self.save_message)(self.sender_username, self.receiver_username, content)

        # Gửi tin nhắn trực tiếp đến WebSocket của người nhận
        await self.send(text_data=json.dumps({
            'message': content,
            'sender': self.sender_username,
            'receiver': self.receiver_username
        }))

    def save_message(self, sender, receiver, content):
        from .models import Message
        # Lưu tin nhắn vào cơ sở dữ liệu
        sender_user = User.objects.get(username=sender)
        receiver_user = User.objects.get(username=receiver)
        Message.objects.create(sender=sender_user, receiver=receiver_user, content=content)
