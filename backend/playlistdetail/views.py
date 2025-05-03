from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import action

# tracks/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import PlaylistDetail
from .serializers import PlaylistDetailSerializer

class PlayListDetailViewSet(viewsets.ModelViewSet):
    queryset = PlaylistDetail.objects.all()
    serializer_class = PlaylistDetailSerializer

    


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Cập nhật thông tin bài hát
    def update(self, request, *args, **kwargs):
        playlistdetail = self.get_object()
        serializer = self.get_serializer(playlistdetail, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Xóa một bài hát
    def destroy(self, request, *args, **kwargs):
        playlistdetail = self.get_object()
        playlistdetail.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    @action(detail=False, methods=['get'], url_path='by-playlist')
    def get_by_playlist(self, request):
        playlist_id_str = request.query_params.get('playlist_id')
        if not playlist_id_str:
            return Response({'error': 'Playlist ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            playlist_id = int(playlist_id_str)
        except ValueError:
            return Response({'error': 'Invalid Playlist ID'}, status=status.HTTP_400_BAD_REQUEST)

        playlist_details = PlaylistDetail.objects.filter(playlist_id=playlist_id)

        if not playlist_details:
            return Response({'message': 'No tracks found for this playlist'}, status=status.HTTP_200_OK)

        # Dữ liệu trả về
        data = []
        for playlist_detail in playlist_details:
            data.append({
                'id': playlist_detail.id,
                'track_id': playlist_detail.track.track_id,
                'track_title': playlist_detail.track.title,
                'releasedate': playlist_detail.track.release_date.isoformat(),
                'album_name': playlist_detail.track.album.title,
                'artist_name': playlist_detail.track.artist.name,
                'track_img': playlist_detail.track.image_url,
                'track_namemp3': playlist_detail.track.namemp3
            })

        return Response(data, status=status.HTTP_200_OK)
    @action(detail=False, methods=['post'], url_path='add-track')
    def add_track(self, request):
        playlist_id = request.data.get('playlist_id')
        track_id = request.data.get('track_id')
        if not playlist_id or not track_id:
            return Response({'error': 'playlist_id and track_id are required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            playlist_id = int(playlist_id)
            track_id = int(track_id)
        except ValueError:
            return Response({'error': 'Invalid IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Check for existing entry
        if PlaylistDetail.objects.filter(playlist_id=playlist_id, track_id=track_id).exists():
            return Response({'message': 'Track already in playlist'}, status=status.HTTP_200_OK)

        # Create new detail
        detail = PlaylistDetail.objects.create(playlist_id=playlist_id, track_id=track_id)
        serializer = self.get_serializer(detail)
        return Response(serializer.data, status=status.HTTP_201_CREATED)