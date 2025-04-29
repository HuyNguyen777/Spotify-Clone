import { Component, OnInit, ViewChild } from '@angular/core';
import { TrackService, Track } from '../../services/tracks.service';  // Import đúng Track và TrackService
import { SearchBarService } from '../../services/searchbar.service';
import { Artist, ArtistService } from '../../services/artists.service';
import { Router } from '@angular/router';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';


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

  selectedPlaylistId: string | null = null;

  createAndSelectNewPlaylist() {
    const newPlaylist = {
      id: Date.now().toString(), // tạo ID ngẫu nhiên đơn giản
      name: `Playlist ${this.playlists.length + 1}`,
      songs: []
    };
    
    this.playlists.push(newPlaylist);           // Thêm vào danh sách sidebar
    this.selectedPlaylistId = newPlaylist.id;        // Chọn playlist vừa tạo
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
    private router:Router) {}

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

  selectPlaylist(id: string) {
    this.selectedPlaylistId = id;
    this.currentPage = 'playlist';
    this.sb.isSearchVisible.next(false);
    this.sb.isPlayListVisible.next(true);
    this.sb.isHomeVisible.next(false);
  }

  get selectedPlaylist() {
    return this.playlists.find(p => p.id === this.selectedPlaylistId) || null;
  }
    
  getArtistName(artistId: number): string {
    return this.artistNames[artistId] || 'Unknown';
  }
  @ViewChild(MusicPlayerComponent) musicPlayer!: MusicPlayerComponent;

  onClickSong(clickedSong: Track, allSongs: Track[]) {
    this.musicPlayer.setQueueAndPlay(allSongs, clickedSong);
  }

}