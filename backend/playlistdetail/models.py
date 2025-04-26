from django.db import models
from playlists.models import Playlist
from tracks.models import Track

class PlaylistDetail(models.Model):
   # playlist_id = models.ForeignKey('Playlist', on_delete=models.CASCADE)
    #track_id = models.ForeignKey('Track', on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)



    class Meta:
        unique_together = ('playlist_id', 'track_id')
        db_table = 'playlistdetail' 

    def __str__(self):
        return f"{self.playlist_id.name} - {self.track_id.title}"

