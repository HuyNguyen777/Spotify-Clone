# tracks/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlayListViewSet

router = DefaultRouter()
router.register(r'playlists', PlayListViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('getPLbyUser/', PlayListViewSet.getPLbyUser),
]
