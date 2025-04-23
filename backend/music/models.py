from django.db import models

# Create your models here.
class Track(models.Model):
    title = models.CharField(max_length=200)
    artist = models.CharField(max_length=100)
    album = models.CharField(max_length=100, blank=True)
    duration = models.IntegerField(help_text="Duration in seconds")
    release_date = models.DateField()

    def __str__(self):
        return f"{self.title} - {self.artist}"