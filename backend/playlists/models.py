from django.db import models

class Playlist(models.Model):
    playlist_id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField(null=True, blank=True)
    is_public = models.BooleanField(default=True)
    release_date = models.DateField(null=True, blank=True)

    class Meta:
        db_table = 'playlists'


    def __str__(self):
        return self.title
