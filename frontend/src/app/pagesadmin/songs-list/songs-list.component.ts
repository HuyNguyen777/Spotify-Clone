import { Component } from '@angular/core';
import { Track, TrackService } from '../../services/tracks.service';
import { ArtistService } from '../../services/artists.service';
import { map, Observable } from 'rxjs';
import { AlbumService } from '../../services/albums.service';
@Component({
  selector: 'app-songs-list',
  standalone: false,
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.css'
})
export class SongsListComponent {
  
  isModalOpen = false;
  newTrack: any = {};
  selectedMp3File!: File;
  selectedImageFile!: File;
  artists: any[] = [];
  albums: any[] = [];


  constructor(private trackService: TrackService, private artistService: ArtistService, private albumService: AlbumService) {}

  public song: Track[] = [];
  artistNames: { [key: number]: string } = {};
  albumNames: { [key: number]: string } = {};
  ngOnInit(): void {
    this.trackService.getTracks().subscribe(data => {
      this.song = data;
      
    });
    this.trackService.getTracks().subscribe((tracks) => {
      this.song = tracks;
      // Lấy tên nghệ sĩ tương ứng
      tracks.forEach((track) => {
        if (track.artist && !this.artistNames[track.artist]) {
          this.artistService.getArtistName(track.artist).subscribe((res) => {
            this.artistNames[track.artist] = res.name;
          });
        }
      });
    });
    this.trackService.getTracks().subscribe((tracks) => {
      this.song = tracks;
      tracks.forEach((track) => {
        if(track.album && !this.albumNames[track.album]) {
          this.albumService.getAlbumName(track.album).subscribe((res) => {
            this.albumNames[track.album] = res.title;
            console.log()
          })
        }
      })
    })
    this.loadAlbums();
    this.loadArtists();
  }

  getArtistName(artistId: number): string {
    return this.artistNames[artistId] || "undefined";
  }
  getAlbumName(albumId: number): string{
    return this.albumNames[albumId] || "undefined";
  }
  openCreate(){
    this.isModalOpen = true;
  }
  loadArtists() {
    this.trackService.getArtists().subscribe((res: any) => {
      console.log('Artists:', res);
      this.artists = res;
    });
  }
  
  loadAlbums() {
    this.trackService.getAlbums().subscribe((res: any) => {
      console.log('Albums:', res);
      this.albums = res;
    });
  }
  



  createTrack() {
    const formData = new FormData();
    formData.append('title', this.newTrack.title);
    formData.append('price', this.newTrack.price);
    formData.append('release_date', this.newTrack.ReleaseDate);
    formData.append('artist', this.newTrack.ArtistId);
    formData.append('album', this.newTrack.Albumid);
    
    // Gửi tên file thay vì file thực
    formData.append('namemp3', this.newTrack.namemp3); // tên file mp3
    formData.append('image_url', this.newTrack.image_url); // tên file hình ảnh
    
    console.log(this.newTrack);
    this.trackService.createTrack(formData).subscribe({
      next: (res) => {
        console.log('Thêm track thành công:', res);
        this.closeCreate();
      },
      error: (err) => {
        console.error('Lỗi khi thêm track:', err);
      }
    });
  }
  
  closeCreate(){
    this.isModalOpen = false;
  }

  onMp3FileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newTrack.namemp3 = file.name;
    }
  }
  
  onImageFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newTrack.image_url = file.name;
    }
  }
  
 
  
}
