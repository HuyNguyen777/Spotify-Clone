import { Component, OnInit, ViewChild } from '@angular/core';
import { TrackService, Track } from '../../services/tracks.service';  // Import đúng Track và TrackService
import { SearchBarService } from '../../services/searchbar.service';
import { Artist, ArtistService } from '../../services/artists.service';
import { Router } from '@angular/router';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';
import { AuthService } from '../../services/auth.service';
import { Playlist, PlaylistService } from '../../services/playlist.service';
import { HttpClient } from '@angular/common/http';
type PageType = 'home' | 'playlist' | 'library';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:false,
})
export class HomeComponent implements OnInit {

  playlists: {
    name: string;
    id: string;
    songs: any[]
  }[] = [];

  selectedPlaylistId: number | null = null;
  playlist: Playlist[] = [];
  token = localStorage.getItem('access_token')!;


  createAndSelectNewPlaylist() {
    console.log("Logged in?", this.authService.isLoggedIn());

  if (!this.authService.isLoggedIn()) {
    //this.dialog.open(LoginDialogComponent);
    alert("You must log in first!");
    return;
  }
    const newPlaylist = {
      id: Date.now().toString(), // tạo ID ngẫu nhiên đơn giản
      name: `Playlist ${this.playlists.length + 1}`,
      songs: []
    };
    
    //this.playlist.push();           // Thêm vào danh sách sidebar
    //this.selectedPlaylistId = newPlaylist.id;        // Chọn playlist vừa tạo
    this.currentPage = 'playlist';   
    this.sb.isHomeVisible.next(false);           // Đổi trang hiển thị
    this.sb.setPlayListVisible.next(true);           // Hiển thị vùng playlist nếu bạn dùng service
  }

  public songCards: Track[] = [];  // Định nghĩa songCards là Track[]

  artistNames: { [key: number]: string } = {};

  currentPage: PageType = 'home'; // Gán type chuẩn

  isCollapsed = false;

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(
    private trackService: TrackService,
    public sb: SearchBarService,
    private artistService: ArtistService,
    private router:Router,
    private authService: AuthService,
    private playlistService: PlaylistService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.trackService.getTracks().subscribe((tracks) => {
      this.songCards = tracks;
      // Lấy tên nghệ sĩ tương ứng
      tracks.forEach((track) => {
        if (track.artist && !this.artistNames[track.artist]) {
          this.artistService.getArtistName(track.artist).subscribe((res) => {
            this.artistNames[track.artist] = res.name;
          });
        }
      });
    });
    this.getUserPlaylist();
  }

  onNavigation(pageName: PageType) {
    if (pageName === 'playlist') {
      this.sb.isPlayListVisible.next(true);
      this.sb.isHomeVisible.next(false);
    } else { // home
      this.selectedPlaylistId = null;
      this.sb.isHomeVisible.next(true);
      this.sb.isPlayListVisible.next(false);
    }
    this.currentPage = pageName;
    console.log('Navigate to:', pageName);
  } 

  selectPlaylist(id: number) {
    this.selectedPlaylistId = id;
    this.currentPage = 'playlist';
    this.sb.isSearchVisible.next(false);
    this.sb.isPlayListVisible.next(true);
    this.sb.isHomeVisible.next(false);
  }

  get selectedPlaylist() {
    return this.playlist.find(p => p.playlist_id === this.selectedPlaylistId) || null;
  }
    
  getArtistName(artistId: number): string {
    return this.artistNames[artistId] || 'Unknown';
  }
  @ViewChild(MusicPlayerComponent) musicPlayer!: MusicPlayerComponent;

  onClickSong(clickedSong: Track, allSongs: Track[]) {
    this.musicPlayer.setQueueAndPlay(allSongs, clickedSong);
  }

  getUserPlaylist() {
    this.http.get<any>(`http://localhost:8000/api/auth/get-user_id/?access_token=${this.token}`)
      .subscribe({
        next: currentUser => {
          const currentid = currentUser.user_id;
  
          this.http.get<any>('http://localhost:8000/api/playlists/getPLbyUser/', {
            params: { user_id: currentid }
          }).subscribe({
            next: data => {
              // Kiểm tra nếu data là một đối tượng, chuyển nó thành mảng
              if (Array.isArray(data)) {
                this.playlist = data;  // Nếu đã là mảng, sử dụng trực tiếp
              } else {
                // Nếu không phải mảng, tạo mảng với đối tượng đó
                this.playlist = [data];
              }
              console.log('Playlist:', this.playlist);
            },
            error: err => console.error('Error fetching playlist:', err)
          });
  
        },
        error: err => console.error('Error getting user id:', err)
      });
  }
  
  

}