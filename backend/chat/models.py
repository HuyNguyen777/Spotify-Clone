from django.db import models
from users.models import User

class Message(models.Model):
    user1_id = models.ForeignKey(User, related_name='chat_user1_messages', on_delete=models.CASCADE)
    user2_id = models.ForeignKey(User, related_name='chat_user2_messages', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Chat' 

    def __str__(self):
        return f'{self.user1_id.user_id} to {self.user2_id.user_id}'
