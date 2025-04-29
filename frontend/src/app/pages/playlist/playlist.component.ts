import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  standalone: false,
})
export class PlaylistComponent implements OnInit{
  @Input() playlistName: string = 'My Playlist';
  @Input() playlistId: string = '';
  @Input() songInPlayList: any[] = [];

  constructor(){}
  songsInPlaylist = [
    {
      thumbnail: 'waybackhome.jpg',
      title: 'Way Back Home',
      artist: 'SHAUN',
      album: 'Take',
      dateAdded: 'Mar 27, 2021',
      duration: '3:34'
    },
    {
      thumbnail: 'muonroi.jpg',
      title: 'Muộn Rồi Mà Sao Còn',
      artist: 'Sơn Tùng M-TP',
      album: 'Muộn Rồi Mà Sao Còn',
      dateAdded: 'May 28, 2021',
      duration: '4:35'
    },
    // tiếp tục các bài khác...
    {
      thumbnail: 'waybackhome.jpg',
      title: 'Way Back Home',
      artist: 'SHAUN',
      album: 'Take',
      dateAdded: 'Mar 27, 2021',
      duration: '3:34'
    },
    {
      thumbnail: 'waybackhome.jpg',
      title: 'Way Back Home',
      artist: 'SHAUN',
      album: 'Take',
      dateAdded: 'Mar 27, 2021',
      duration: '3:34'
    },
    {
      thumbnail: 'waybackhome.jpg',
      title: 'Way Back Home',
      artist: 'SHAUN',
      album: 'Take',
      dateAdded: 'Mar 27, 2021',
      duration: '3:34'
    },
    {
      thumbnail: 'waybackhome.jpg',
      title: 'Way Back Home',
      artist: 'SHAUN',
      album: 'Take',
      dateAdded: 'Mar 27, 2021',
      duration: '3:34'
    },
    {
      thumbnail: 'waybackhome.jpg',
      title: 'Way Back Home',
      artist: 'SHAUN',
      album: 'Take',
      dateAdded: 'Mar 27, 2021',
      duration: '3:34'
    },
  ];

  ngOnInit(): void {
      
  }
}
