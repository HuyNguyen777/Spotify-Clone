from django.http import JsonResponse
from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Playlist
from .serializers import PlaylistSerializer

class PlayListViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        playlist = self.get_object()
        serializer = self.get_serializer(playlist, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        playlist = self.get_object()
        playlist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    