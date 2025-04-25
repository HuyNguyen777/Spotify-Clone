from django.http import JsonResponse
from django.shortcuts import render

# tracks/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Track
from .serializers import TrackSerializer
from artists.models import Artist  # Import mô hình Artist

class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

    # Tìm kiếm bài hát theo tên hoặc nghệ sĩ
    def get_queryset(self):
        queryset = Track.objects.all()
        title = self.request.query_params.get('title', None)
        
        if title:
            queryset = queryset.filter(title__icontains=title)
        
        return queryset


    # Tạo một bài hát mới
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Cập nhật thông tin bài hát
    def update(self, request, *args, **kwargs):
        track = self.get_object()
        serializer = self.get_serializer(track, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Xóa một bài hát
    def destroy(self, request, *args, **kwargs):
        track = self.get_object()
        track.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    def get_artist_name(request, artist_id):
        try:
            artist = Artist.objects.get(pk=artist_id)
            return JsonResponse({'artist_id': artist_id, 'name': artist.name})
        except Artist.DoesNotExist:
            return JsonResponse({'error': 'Artist not found'}, status=404)