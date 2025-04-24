import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SongDataService } from '../../services/song-data.service';
import { Track, TrackService } from '../../services/tracks.service';
@Component({
  selector: 'app-song-card',
  standalone: false,
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.css'
})
export class SongCardComponent implements OnInit {
  @Input() public playlistThumbnail!: string;
  @Input() public title!: string;
  @Input() public description!: string;
  @Input() public song_id!: string | number;
  @Input() public link!: string;

  /*@Input() public playlistThumbnail!: string;
  @Input() public title!: string;
  @Input() public description!: string;
  @Input() public link!: string;
  @Input() public song_id!: string | number;
  constructor(private router: Router, private sd: SongDataService) {}

  ngOnInit(): void {}
*/
onNavigateToSong() {
  // Điều hướng tới trang chi tiết bài hát và truyền state
  this.router.navigateByUrl(`/song/${this.song_id}`, {
    state: {
      thumbnail: this.playlistThumbnail,
      title: this.title,
      description: this.description,
      link: this.link, // Đảm bảo link là đường dẫn chính xác đến file mp3
      id: this.song_id,
    },
  });
}

    tracks: Track[] = [];

    constructor(private trackService: TrackService,private router:Router) {}
  
    ngOnInit(): void {
      this.trackService.getTracks().subscribe(data => {
        this.tracks = data;
        
      });
    }
}

