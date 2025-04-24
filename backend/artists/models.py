from django.db import models

class Artist(models.Model):
    artist_id = models.IntegerField(primary_key=True)
    popularity_score = models.IntegerField(max_length=255)
    name = models.CharField(max_length=200)
    artist_img = models.CharField(max_length=200)
    gener = models.CharField(max_length=200)

    class Meta:
        db_table = 'artists'


    def __str__(self):
        return self.name



# Create your models here.
