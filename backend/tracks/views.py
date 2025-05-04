from django.http import JsonResponse
from django.shortcuts import render
from django.core.files.storage import default_storage
from .utils import copy_mp3_to_public, copy_image_to_public
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
# tracks/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Track
from .serializers import TrackSerializer
from artists.models import Artist  # Import mô hình Artist
from albums.models import Album
import os
import shutil
from django.conf import settings


class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer

    def get_queryset(self):
        queryset = Track.objects.all()
        title = self.request.query_params.get('title', None)
        
        if title:
            queryset = queryset.filter(title__icontains=title)
        
        return queryset


    # Tạo một bài hát mới
    def create(self, request, *args, **kwargs):
        # Trực tiếp làm việc với request.data
        mp3_file = request.FILES.get('mp3File')
        image_file = request.FILES.get('imageFile')

        # Chuẩn bị dữ liệu cho track
        track_data = {
            'title': request.data.get('title'),
            'price': request.data.get('price'),
            'release_date': request.data.get('release_date'),
            'artist': request.data.get('artist'),
            'album': request.data.get('album')
        }

        # Lưu file mp3 nếu có
        if mp3_file:
            mp3_path = default_storage.save('mp3/' + mp3_file.name, mp3_file)
            track_data['namemp3'] = mp3_file.name
            copy_mp3_to_public(mp3_file.name)

        # Lưu file ảnh nếu có
        if image_file:
            image_path = default_storage.save('images/' + image_file.name, image_file)
            track_data['image_url'] = image_file.name
            copy_image_to_public(image_file.name)


        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)  # Debug lỗi rõ hơn
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Cập nhật thông tin bài hát
    def update(self, request, *args, **kwargs):
        track = self.get_object()
        serializer = self.get_serializer(track, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
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
        
    def get_album_name(request, album_id):
        try:
            album = Album.objects.get(pk=album_id)
            return JsonResponse({'album_id': album_id, 'title': album.title})
        except Album.DoesNotExist:
            return JsonResponse({'error': 'Album not found'}, status=404)
