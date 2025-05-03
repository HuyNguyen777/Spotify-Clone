from rest_framework import serializers
from .models import PlaylistOrder

class PlaylistOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistOrder
        fields = '__all__'
