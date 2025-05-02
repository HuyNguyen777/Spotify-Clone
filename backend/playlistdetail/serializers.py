from rest_framework import serializers
from .models import PlaylistDetail
from tracks.models import Track  # import Track model
from albums.models import Album  # import Album model
class PlaylistDetailSerializer(serializers.ModelSerializer):
    track_title = serializers.CharField(source='track.title', read_only=True)
    releasedate = serializers.DateField(source='track.releasedate', read_only=True)
    album_name = serializers.CharField(source='track.album.name', read_only=True)
    artist_name = serializers.CharField(source="track.artist.name", read_only=True)
    track_img = serializers.CharField(source="track.image_url", read_only=True)
    track_namemp3 = serializers.CharField(source="track.namemp3", read_only=True)

    class Meta:
        model = PlaylistDetail
        fields = ['id', 'playlist', 'track', 'track_title', 'releasedate', 'album_name']
