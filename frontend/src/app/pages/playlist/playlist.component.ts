import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';
import { Track, TrackService } from '../../services/tracks.service';
import { MusicPlayerService } from '../../services/music-player.service';
import { ArtistService } from '../../services/artists.service';
import { map, Observable } from 'rxjs';
import { PlaylistService } from '../../services/playlist.service';

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
  Song: any[] = [];  // ✅ Mảng để lưu danh sách bài hát
  filteredTracks: Track[] = [];
  searchText: string = '';

  tracks: Track[] = []
  constructor(private http: HttpClient,private musicPlayerService: MusicPlayerService, private trackService: TrackService,private artistService: ArtistService, private playlistDetailService: PlaylistService){}
  
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
  @ViewChild(MusicPlayerComponent) musicPlayer!: MusicPlayerComponent;

  onClickSong(clickedSong: Track, allSongs: Track[]) {
    this.musicPlayerService.setQueueAndPlay(allSongs, clickedSong);
  }


  getUserPlaylist() {
    this.http.get<any>('http://localhost:8000/api/playlistdetail/by-playlist/', {
      params: { playlist_id: this.playlistId }
    }).subscribe({
      next: data => {
        if (Array.isArray(data)) {
          this.Song = data;
        } else {
          this.Song = [data];
        }
  
        // 🔁 Sau khi this.Song đã có dữ liệu, convert thành Track[]
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
  
        // 👇 Tạo mới Track từ response và thêm vào danh sách hiện tại
       /* const newTrack: Track = {
          track_id: response.track.track_id,
          title: response.track_title,
          artist: response.artist_name,
          image_url: response.track_img,
          namemp3: response.track_namemp3,
          price: 0,
          is_copyright: true,
          album: response.album_name,
          release_date: response.releasedate
        };
  
        this.tracks.push(newTrack);  // 👈 Thêm track vào danh sách hiện tại*/
        this.getUserPlaylist();
      },
      error: (error) => {
        console.error('Lỗi khi thêm bài hát:', error);
      }
    });
  }
  
  
}
