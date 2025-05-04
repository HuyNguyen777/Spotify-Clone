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
  isEditMode = false;
  selectedFileNameImage: string = '';
  selectedFileNameMp3: string = '';
  isEditModalOpen = false;
  isEditing: boolean = false;
  trackIdToEdit: number | null = null;


  constructor(private trackService: TrackService, private artistService: ArtistService, private albumService: AlbumService) {}

  public song: Track[] = [];
  artistNames: { [key: number]: string } = {};
  albumNames: { [key: number]: string } = {};

  ngOnInit(): void {
    this.trackService.getTracks().subscribe((tracks) => {
      this.song = tracks;
      console.log('track ', this.song);
  
      tracks.forEach((track) => {
        if (track.artist && !this.artistNames[track.artist]) {
          this.artistService.getArtistName(track.artist).subscribe((res) => {
            this.artistNames[track.artist] = res.name;
          });
        }
  
        if (track.album && !this.albumNames[track.album]) {
          this.albumService.getAlbumName(track.album).subscribe((res) => {
            this.albumNames[track.album] = res.title;
          });
        }
      });
    });
  
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
    this.isEditMode = false;
    this.newTrack = {};
    this.trackIdToEdit = null;
    this.selectedFileNameImage = '';   
    this.selectedFileNameMp3 = '';     
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
  



  createOrUpdateTrack() {
    const formData = new FormData();
    formData.append('title', this.newTrack.title);
    formData.append('price', this.newTrack.price);
    formData.append('release_date', this.newTrack.release_date);
    formData.append('artist', this.newTrack.artist.toString());
    formData.append('album', this.newTrack.album.toString());

    if (this.selectedMp3File) {
      formData.append('namemp3', this.selectedMp3File, this.selectedMp3File.name);
    }
    
    if (this.selectedImageFile) {
      formData.append('image_url', this.selectedImageFile, this.selectedImageFile.name);
    }
    
    if(this.isEditMode && this.trackIdToEdit !== null){
      this.trackService.updateTrack(this.trackIdToEdit, formData).subscribe({
        next: () => {
          this.closeCreate();
          this.loadTracks();
        },
        error: (err) => console.error('Lỗi cập nhật:', err)
      })
    } else {
      console.log(this.newTrack);
      this.trackService.createTrack(formData).subscribe({
        next: (res) => {
          console.log('Thêm track thành công:', res);
          this.closeCreate();
          this.loadTracks();
        },
        error: (err) => {
          console.error('Lỗi khi thêm track:', err);
        }
      });
    }
    
  }

  OpenEditTrack(track: Track){
    this.isEditMode = true;
    this.isModalOpen = true;

    this.trackIdToEdit = track.track_id;
    
    this.selectedFileNameImage = this.getFileName(track.image_url);
    this.selectedFileNameMp3 = this.getFileName(track.namemp3);

    this.selectedImageFile = undefined as any;
    this.selectedMp3File = undefined as any;

    this.newTrack = {
      title: track.title,
      price: track.price,
      release_date: track.release_date,
      artist: track.artist,
      album: track.album,

      namemp3: track.namemp3,
      image_url: track.image_url,
    };

    console.log("track ar id", this.newTrack.artist);
    console.log("track al id", this.newTrack.album);
  }
  
  closeCreate(){
    this.isModalOpen = false;
  }

  onMp3FileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'audio/mpeg') {
      this.selectedMp3File = file; // Lưu file mp3 thực sự
      this.newTrack.namemp3 = file.name; // Lưu tên file (nếu cần thiết)
      this.selectedFileNameMp3 = file.name;
    }
  }
  
  onImageFileChange(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedImageFile = file; // Lưu file ảnh thực sự
      this.newTrack.image_url = file.name; // Lưu tên file ảnh (nếu cần thiết)
      this.selectedFileNameImage = file.name;
    }
  }

  deleteTrack(trackid: number){
    if(confirm("Bạn có muốn xóa không ?")) {
      this.trackService.deleteTrack(trackid).subscribe({
        next: () => this.loadTracks(),
        error: (err) => console.error("Xoa khong thanh cong", err)
      });
    }
  }
  
  getFileName(fullPath: string): string {
    if (!fullPath) return '';
    return fullPath.split('/').pop() || fullPath;
  }
 
  loadTracks(){
    this.trackService.getTracks().subscribe((res : any) => {
      this.song = res;
    });
  }
}
