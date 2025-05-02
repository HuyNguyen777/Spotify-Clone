import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  standalone: false,
})
export class PlaylistComponent implements OnInit{
  @Input() playlistName: string = 'My Playlist';
  @Input() playlistId: number | undefined;
  @Input() songInPlayList: any[] = [];

  constructor(private http: HttpClient){}
  songsInPlaylist = [
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



  /*getUserPlaylist() {
  
  
    this.http.get<any>('http://localhost:8000/api/playlistdetail/by-playlist/', {
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

        
     
  }*/
}
