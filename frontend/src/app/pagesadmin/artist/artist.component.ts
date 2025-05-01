import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.css',
  standalone: false
})
export class ArtistComponent implements OnInit {
  artistList = [
    {
      id: 'A001',
      thumbnail: 'https://i.pravatar.cc/40?img=1',
      name: 'The Weeknd',
      popularity: 95,
      genre: 'Pop',
    },
    {
      id: 'A002',
      thumbnail: 'https://i.pravatar.cc/40?img=2',
      name: 'Drake',
      popularity: 88,
      genre: 'Hip-hop',
    }
  ];
  
  isModalOpen = false;
  

  
  openModal() {
    this.isModalOpen = true;
  }
  
  closeModal() {
    this.isModalOpen = false;
  }
  
  newArtist = {
    name: '',
    genre: '',
    popularity: 0,
    thumbnail: ''
  };

  submitForm() {
    if (this.newArtist.name && this.newArtist.genre) {
      const newId = 'A' + (this.artistList.length + 1).toString().padStart(3, '0');
      this.artistList.push({
        id: newId,
        ...this.newArtist
      });
  
      this.newArtist = { name: '', genre: '', popularity: 0, thumbnail: '' };
      this.closeModal();
    }
  }

  constructor(){}

  ngOnInit(): void {
      
  }

}
