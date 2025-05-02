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
            this.albumNames[track.album] = res.name;
          })
        }
      })
    })

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
