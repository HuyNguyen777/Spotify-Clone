import { Component, OnInit } from '@angular/core';
import { Album, AlbumService } from '../../services/albums.service';
import { Artist, ArtistService } from '../../services/artists.service';

@Component({
  selector: 'app-album',
  standalone: false,
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit {

  isModalOpen = false;
  public album: Album[] = [];
  newAlbum: any = {};
  artists: Artist[] = [];
  artistNames: { [key: number]: string } = {};
  isEditMode = false;
  editAlbumId: number | null = null;
  albumIdToEdit: number | null = null;

  openCreate(){
    this.isModalOpen = true;
    this.isEditMode = false;
    this.isEditMode = false;
    this.albumIdToEdit = null;
    this.newAlbum = {};
  }

  closeCreate(){
    this.isModalOpen = false;
  }

  constructor(private albumService: AlbumService, private artistService: ArtistService){}

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe((albums) => {
      this.album = albums;
      console.log('album ', this.album);
  
      albums.forEach((al) => {
        if (al.artist && !this.artistNames[al.artist]) {
          this.artistService.getArtistName(al.artist).subscribe((res) => {
            this.artistNames[al.artist] = res.name;
          });
        }
      });
    });


    this.loadAlbum();
    this.loadArtist(); 
  }

  submitFormAlbum(){
    const formData = new FormData();
    formData.append('title', this.newAlbum.title);
    formData.append('deception', this.newAlbum.deception);
    formData.append('total_track', this.newAlbum.total_tracks.toString());
    formData.append('releasedate', this.newAlbum.releasedate);
    formData.append('artist', this.newAlbum.artist.toString());

    if(this.isEditMode && this.albumIdToEdit !== null){
      this.albumService.updateAlbum(this.albumIdToEdit, formData).subscribe({
        next: () => {
          this.loadAlbum();
          this.closeCreate();
        }
      });
    } else { 
      this.albumService.createAlbum(formData).subscribe({
        next: (res) => {
          console.log('Thêm album thành công', res);
          this.loadAlbum();
          this.closeCreate();
          
        },
        error: (err) => {
          console.error('Loi', err);
        }
      });
    }
    
  }

  editAlbum(album: Album){
    this.isEditMode = true;
    this.isModalOpen = true;
    this.albumIdToEdit = album.album_id;
    this.newAlbum = {
      title: album.title,
      deception: album.deception,
      total_tracks: album.total_tracks,
      releasedate : album.releasedate,
      artist: album.artist
    };
    console.log("edit album id", this.editAlbumId)
  }

  deleteAlbum(album_id: number){
    if(confirm("Bạn có muốn xóa album không ?")){
      this.albumService.deleteAlbum(album_id).subscribe({
        next: () => {
          this.loadAlbum();
        },
        error: (err) => {
          console.log('Loi', err);
        }
      })
    }
  }

  loadAlbum(){
    this.albumService.getAllAlbums().subscribe((res : any) =>{
      console.log('Album', res);
      this.album = res;
    });
  }

  getArtistName(artistId: number): string {
    return this.artistNames[artistId] || "undefined";
  }

  loadArtist(){
    this.albumService.getArtistName().subscribe((res: any) => {
      console.log('Artist', res);
      this.artists = res;
    })
  }



}
