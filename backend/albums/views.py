from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Album
from .serializers import AlbumSerializer

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class =AlbumSerializer

    # Tìm kiếm theo tên
    def get_queryset(self):
        queryset = Album.objects.all()
        name = self.request.query_params.get('name', None)
        
        if name:
            queryset = queryset.filter(name__icontains=name)
        
        return queryset

    # Tạo mới
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Cập nhật thông tin nghệ sĩ
    def update(self, request, *args, **kwargs):
        artist = self.get_object()
        serializer = self.get_serializer(artist, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        artist = self.get_object()
        artist.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_album_name_by_id(album_id):
        try:
            return Album.objects.get(id=album_id).title
        except Album.DoesNotExist:
            return "Unknown Artist"
