import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Artist, ArtistService } from '../../services/artists.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css',
  standalone: false
})
export class ArtistComponent implements OnInit {

  artist: Artist[] = [];
  selectedFile: File | null = null;
  isEditMode = false;
  editArtistId: number | null = null;
  selectedFileName: string = '';

  constructor(private artistService: ArtistService){}
  
  isModalOpen = false;
  
  openModal() {
    this.isEditMode = false;
    this.editArtistId = null;
    this.isModalOpen = true;
    this.newArtist = {
      name: '',
      gener: '',
      popularity_score: 0,
      artist_img: ''
    };
    this.selectedFile = null;
    this.selectedFileName = '';
  }
  
  closeModal() {
    this.isModalOpen = false;
  }
  
  newArtist = {
    name: '',
    gener: '',
    popularity_score: 0,
    artist_img: ''
  };

  submitForm() {
    const formData = new FormData();
    formData.append('name', this.newArtist.name);
    formData.append('genre', this.newArtist.gener);
    formData.append('popularity', this.newArtist.popularity_score.toString());
    if (this.selectedFile) {
    formData.append('artist_img', this.selectedFile);
    }

    if(this.isEditMode && this.editArtistId !== null){
      this.artistService.updateArtist(this.editArtistId, formData).subscribe({
        next: () => {
          this.loadArtists();
          this.closeModal();
        }
      })
    } else {
      console.log(this.newArtist);
      this.artistService.createArtist(formData).subscribe({
        next: (res) => {
          console.log('Thêm artist thành công', res);
          this.closeModal();
          this.loadArtists();
        },
        error: (err) => {
          console.error('Loi', err);
        }
      });
    }
  }

  editArtist(artist: Artist) {
    this.isEditMode = true;
    this.isModalOpen = true;
    this.editArtistId = artist.artist_id;
    this.selectedFileName = this.extractFileName(artist.artist_img);
    this.newArtist = {
      name: artist.name,
      gener: artist.gener,
      popularity_score: artist.popularity_score,
      artist_img: artist.artist_img,
    };
  }

  extractFileName(url: string): string {
    return url.split('/').pop() || '';
  }

  deleteArtist(artistid: number) {
    if(confirm("Bạn có muốn xóa không ?")) {
      this.artistService.deleteArtist(artistid).subscribe({
        next: () => this.loadArtists(),
        error: (err) => console.error("Xoa khong thanh cong", err)
      });
    }
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    } else {
      console.error('Tệp không hợp lệ!');
    }
  }

  loadArtists(){
    this.artistService.getArtists().subscribe((res : any) => {
      console.log('Artist', res);
      this.artist = res;
    });
  }

  resetForm() {
    this.newArtist = {
      name: '',
      gener: '',
      popularity_score: 0,
      artist_img: ''
    };
    this.selectedFile = null;
    this.isEditMode = false;
    this.editArtistId = null;
  }
  

  ngOnInit(): void {
      this.loadArtists();
  }

}
