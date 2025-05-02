# album/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlbumViewSet

router = DefaultRouter()
router.register(r'album', AlbumViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
