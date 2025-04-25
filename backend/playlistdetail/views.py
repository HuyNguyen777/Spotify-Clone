from django.http import JsonResponse
from django.shortcuts import render

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
    