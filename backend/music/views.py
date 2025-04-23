from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Track
from .serializers import TrackSerializer

@api_view(['GET'])
def get_all_tracks(request):
    tracks = Track.objects.all()
    serializer = TrackSerializer(tracks, many=True)
    return Response(serializer.data)
