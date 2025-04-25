# tracks/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlayListDetailViewSet

router = DefaultRouter()
router.register(r'playlistdetail', PlayListDetailViewSet)

urlpatterns = [
    path('', include(router.urls)),

]
