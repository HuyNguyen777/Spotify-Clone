from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('role.urls')),
    path('api/', include('tracks.urls')),
    path('api/', include('artists.urls')),
    path('api/', include('albums.urls')),
    path('api/auth/', include('users.urls')),
    path('api/chat/', include('chat.urls')),
    path('api/', include('playlists.urls')),
    path('api/', include('playlistdetail.urls')),

    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
