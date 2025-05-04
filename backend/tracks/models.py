from django.db import models
from albums.models import Album  # Nếu Album nằm trong app albums
from artists.models import Artist

class Track(models.Model):
    track_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    #album_id = models.ForeignKey('Album', on_delete=models.CASCADE, null=True, blank=True)
    #artist_id = models.ForeignKey('Artist', on_delete=models.CASCADE, null=True, blank=True)
    is_Copyright = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image_url = models.ImageField(upload_to='images/')
    release_date = models.DateField(null=True, blank=True)
    namemp3 = models.FileField(upload_to='mp3/')
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    class Meta:
        db_table = 'tracks' 
    def __str__(self):
        return self.title
