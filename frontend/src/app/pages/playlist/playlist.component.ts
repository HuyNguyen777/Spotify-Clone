import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';
import { Track } from '../../services/tracks.service';

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

  tracks: Track[] = []
  constructor(private http: HttpClient){}
  songsInPlaylist = [
    {
      thumbnail: 'waybackhome.jpg',
      title: 'Way Back Home',
      artist: 'SHAUN',
      album: 'Take',
      dateAdded: 'Mar 27, 2021',
      duration: '3:34'
    },
    
  ];

  
  /*ngOnInit(): void {
      this.getUserPlaylist();
  }*/
  ngOnChanges(): void {
    
      this.getUserPlaylist();  // Gọi lại mỗi khi playlistId thay đổi
     /* for (let s of this.Song) {
        let track: Track = {
          track_id: s.track_id,
          title: s.title,
          artist: s.artist_name,
          image_url: s.track_img,
          namemp3: s.track_namemp3,
          price: 0,
          is_copyright:true,
          album: s.album_name,
          release_date: s.releasedate
        };
        this.tracks.push(track);
      }
    */
  }
  @ViewChild(MusicPlayerComponent) musicPlayer!: MusicPlayerComponent;

  onClickSong(clickedSong: Track, allSongs: Track[]) {
    this.musicPlayer.setQueueAndPlay(allSongs, clickedSong);
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
            title: s.title,
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
  
}
