from django.db import models

# Create your models here.
class Track(models.Model):
    track_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    album_id = models.IntegerField(null=True, blank=True)
    artist_id = models.IntegerField(null=True, blank=True)
    is_Copyright = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image_url = models.TextField(null=True, blank=True)
    release_date = models.DateField(null=True, blank=True)
    namemp3 = models.CharField(max_length=200)

    class Meta:
        db_table = 'tracks'  # Đảm bảo tên bảng là 'tracks'

    def __str__(self):
        return f"{self.title} - {self.artist_id}"
