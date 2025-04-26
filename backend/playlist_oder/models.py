from django.db import models
from tracks.models import Track  # Nếu Track nằm trong app tracks
from users.models import User  # Nếu User nằm trong app users
# Create your models here.
class PlaylistOrder(models.Model):
    playlist_oder_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    datte_oder = models.DateField(null=True, blank=True)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.name if self.name else f"Order {self.playlist_oder_id}"
