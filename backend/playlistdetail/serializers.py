from rest_framework import serializers
from .models import PlaylistDetail

class PlaylistDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistDetail
        fields = '__all__'
