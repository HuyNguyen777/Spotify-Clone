import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';
import { Track, TrackService } from '../../services/tracks.service';
import { MusicPlayerService } from '../../services/music-player.service';
import { ArtistService } from '../../services/artists.service';
import { map, Observable } from 'rxjs';
import { PlaylistService } from '../../services/playlist.service';
import { Route, Router } from '@angular/router';
import { SearchBarService } from '../../services/searchbar.service';
type PageType = 'home' | 'playlist' | 'library';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  standalone: false,
})
export class PlaylistComponent {
  @Input() playlistName: string = 'My Playlist';
  @Input() playlistId: number = 1;
  @Input() songInPlayList: any[] = [];
  Song: any[] = [];  
  filteredTracks: Track[] = [];
  searchText: string = '';
  username = localStorage.getItem('username')!;
  currentPage: PageType = 'playlist'; // Gán type chuẩn

  tracks: Track[] = []
  constructor(
    private http: HttpClient,
    private musicPlayerService: MusicPlayerService,
     private trackService: TrackService,
     private artistService: ArtistService, 
     private playlistDetailService: PlaylistService,private router: Router,    public sb: SearchBarService,
  ){}
  
  artistNames: { [key: number]: string } = {};

  
  /*ngOnInit(): void {
      this.getUserPlaylist();
  }*/
  ngOnChanges(): void {
    
      this.getUserPlaylist();  // Gọi lại mỗi khi playlistId thay đổi
      this.trackService.getTracks().subscribe((tracks) => {
        // Lấy tên nghệ sĩ tương ứng
        tracks.forEach((track) => {
          if (track.artist && !this.artistNames[track.artist]) {
            this.artistService.getArtistName(track.artist).subscribe((res) => {
              this.artistNames[track.artist] = res.name;
            });
          }
        });
      });
     
  }

  onClickSong(clickedSong: Track, allSongs: Track[]) {
    this.musicPlayerService.setQueueAndPlay(allSongs, clickedSong);
  }


  getUserPlaylist() {
    this.http.get<any>('http://127.0.0.1:8000/api/playlistdetail/by-playlist/', {
      params: { playlist_id: this.playlistId }
    }).subscribe({
      next: data => {
        if (Array.isArray(data)) {
          this.Song = data;
        } else {
          this.Song = [data];
        }
        console.log(this.Song)
        this.tracks = this.Song.map(s => {
          const track: Track = {
            track_id: s.track_id,
            title: s.track_title,
            artist: s.artist_name,
            image_url: s.track_img,
            namemp3: s.track_namemp3,
            price: 0,
            is_copyright: true,
            album: s.album_name,
            release_date: s.releasedate
          };
          return track;
        });
  
        console.log('Tracks:', this.tracks);
      },
      error: err => console.error('Error fetching playlist:', err)
    });
  }
  // playlist.component.ts
  // playlist.component.ts
  onSearchChange(): void {
    const query = this.searchText.trim();

    if (!query) {
      this.trackService.getTracks().subscribe(tracks => this.filteredTracks = tracks);
      return;
    }

    this.trackService.getTracksByTitle(query).subscribe(tracks => {
      this.filteredTracks = tracks;
    });
  }
  getArtistName(artistId: number): string {
    return this.artistNames[artistId] || 'Unknown';
  }
  
  addTrack(trackId: number): void {
    const playlistId = this.playlistId;
  
    this.playlistDetailService.addTrackToPlaylist(playlistId, trackId).subscribe({
      next: (response) => {
        console.log('Thêm thành công:', response);
  
        this.getUserPlaylist();
      },
      error: (error) => {
        console.error('Lỗi khi thêm bài hát:', error);
      }
    });
  }
  
  deleteTrack(detailId: number) {
    if (confirm('Are you sure you want to remove this track from playlist?')) {
      this.playlistDetailService.deleteTrackFromPlaylist(detailId).subscribe({
        next: () => {
          console.log('Track deleted');
          this.getUserPlaylist(); // Cập nhật lại danh sách
        },
        error: err => console.error('Delete error', err)
      });
    }
  }
  
  isEditingTitle = false;

  startEditingTitle() {
    this.isEditingTitle = true;
  }
  
  savePlaylistName() {
    this.isEditingTitle = false;
  
    // Gọi API cập nhật tên playlist nếu cần
    this.http.patch(`http://127.0.0.1:8000/api/playlists/${this.playlistId}/`, {
      name: this.playlistName
    }).subscribe({
      next: () => console.log('Tên playlist đã được cập nhật'),
      error: (err) => console.error('Lỗi khi cập nhật tên playlist', err)
    });
  }
  isPublic: boolean = true; 

togglePrivacy() {
  this.isPublic = !this.isPublic;

  // Gọi API để cập nhật trạng thái public/private
  this.http.patch(`http://127.0.0.1:8000/api/playlists/${this.playlistId}/`, {
    is_public: this.isPublic
  }).subscribe({
    next: () => console.log('Cập nhật quyền truy cập playlist thành công'),
    error: err => console.error('Lỗi khi cập nhật quyền truy cập', err)
  });
}
deletePlaylist() {
  if (confirm('Are you sure you want to delete this playlist?')) {
    this.http.delete(`http://127.0.0.1:8000/api/playlists/${this.playlistId}/`)
      .subscribe({
        next: () => {
          alert('Playlist deleted successfully');
          // Redirect hoặc cập nhật giao diện
         
        },
        error: err => {
          console.error('Error deleting playlist:', err);
          alert('Failed to delete playlist');
        }
      });
  }
}

}
