import { Component } from '@angular/core';

@Component({
  selector: 'app-songs-list',
  standalone: false,
  templateUrl: './songs-list.component.html',
  styleUrl: './songs-list.component.css'
})
export class SongsListComponent {
  songsList =[
    {
      trackid: '1',
      image: 'https://i.pravatar.cc/40?img=1',
      title: 'Chung ta khong thuoc ve nhau',
      price: '23',
      ReleaseDate: '12/12/2025',
      NameMp3: 'chungtakhongthuocvenhau.mp3',
      Albumid: '1',
      ArtistId: '1'
    }
  ];

  isModalOpen = false;

  openCreate(){
    this.isModalOpen = true;
  }

  closeCreate(){
    this.isModalOpen = false;
  }

  newTrack = {
      image: '',
      title: '',
      price: '',
      ReleaseDate: '',
      NameMp3: '',
      Albumid: '',
      ArtistId: ''
  };

  submitFormSong(){
    if (this.newTrack.title && this.newTrack.price) {
      const newTrackId = 'T' + (this.songsList.length + 1).toString().padStart(5, '0');
      this.songsList.push({
        trackid: newTrackId,
        ...this.newTrack
      });
  
      this.newTrack= { 
        image: '',
        title: '',
        price: '',
        ReleaseDate: '',
        NameMp3: '',
        Albumid: '',
        ArtistId: ''
      };
      this.closeCreate();
    }
  }
}
