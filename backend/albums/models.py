from django.db import models
from artists.models import Artist  # Nếu Artist nằm trong app artists

class Album(models.Model):
    album_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    deception = models.TextField(null=True, blank=True)
    #artist_id = models.ForeignKey('Artist', on_delete=models.SET_NULL, null=True, blank=True)
    total_tracks = models.IntegerField(default=0)
    releasedate = models.DateField(null=True, blank=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    class Meta:
        db_table = 'albums' 
    def __str__(self):
        return self.title
