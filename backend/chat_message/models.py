from django.db import models
from users.models import User
from chat.models import Message

class Message(models.Model):
    sender_id = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    create_at = models.DateTimeField(auto_now_add=True)
    chat_id = models.ForeignKey(Message, related_name='Chat_id',on_delete=models.CASCADE)
    message_text = models.CharField(max_length=255)
    isRead = models.BooleanField(default=True)


    class Meta:
            db_table = 'chat_message' 
    def __str__(self):
        
        return f'{self.sender.username} to {self.receiver.username}: {self.content}'
