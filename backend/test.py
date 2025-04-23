import os
import django

# Thiết lập Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

# Import model
from music.models import Track

# In danh sách tracks ra console
tracks = Track.objects.all()
print(f"Found {tracks.count()} tracks")


# Xuất dữ liệu ra console
for track in tracks:
    print(f"ID: {track.track_id} | Title: {track.title}")
