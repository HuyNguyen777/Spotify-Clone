# tracks/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TrackViewSet

router = DefaultRouter()
router.register(r'tracks', TrackViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('artist-name/<int:artist_id>/', TrackViewSet.get_artist_name, name='get-artist-name'),
    path('album-name/<int:album_id>/', TrackViewSet.get_album_name, name='get-album-name'),

]
