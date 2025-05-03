from django.db import models

class Artist(models.Model):
    artist_id = models.AutoField(primary_key=True)
    popularity_score = models.IntegerField(default=0)
    name = models.CharField(max_length=255)
    gener = models.CharField(max_length=255, null=True, blank=True)
    artist_img = models.ImageField(upload_to='artists/', null=True, blank=True)
    class Meta:
        db_table = 'artists' 
    def __str__(self):
        return self.name

