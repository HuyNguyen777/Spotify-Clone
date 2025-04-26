from django.db import models
from users.models import User  # Nếu User nằm trong app users

class Playlist(models.Model):
    playlist_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    ispublic = models.BooleanField(default=True)
    releasedate = models.DateField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        db_table = 'playlists' 
    def __str__(self):
        return self.name
