from django.http import JsonResponse
from django.shortcuts import render

# tracks/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import PlaylistOrder
from .serializers import PlaylistOrderSerializer

class TrackViewSet(viewsets.ModelViewSet):
    queryset = PlaylistOrder.objects.all()
    serializer_class = PlaylistOrderSerializer

    def get_queryset(self):
        queryset = PlaylistOrder.objects.all()
        title = self.request.query_params.get('name', None)
        
        if title:
            queryset = queryset.filter(title__icontains=title)
        
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        track = self.get_object()
        serializer = self.get_serializer(track, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        track = self.get_object()
        track.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    