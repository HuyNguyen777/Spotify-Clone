from django.db import models

class PlaylistDetail(models.Model):
    playlist_id = models.IntegerField(primary_key=True)
    track_id = models.IntegerField(primary_key=True)

    class Meta:
        db_table = 'playlistdetail'


    def __str__(self):
        return self.title
