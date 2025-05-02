from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import action

from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Playlist
from .serializers import PlaylistSerializer
from users.models import User
class PlayListViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer

    


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print('loi:',serializer.errors)
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
    @action(detail=False, methods=['get'], url_path='getPLbyUser')
    def getPLbyUser(self, request):
        user_id_str = request.query_params.get('user_id')
        if not user_id_str:
            return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_id = int(user_id_str)
        except (ValueError, User.DoesNotExist):
            return Response({'error': 'Invalid User ID'}, status=status.HTTP_400_BAD_REQUEST)

        playlists = Playlist.objects.filter(user_id=user_id)

        if not playlists:
            return Response({'message': 'No playlists found for this user'}, status=status.HTTP_200_OK)

        data = []
        for playlist in playlists:
            data.append({
                'playlist_id': playlist.playlist_id,
                'name': playlist.name,
                'releasedate': playlist.releasedate.isoformat(),
                'user_id': user_id
            })

        return Response(data, status=status.HTTP_200_OK)
