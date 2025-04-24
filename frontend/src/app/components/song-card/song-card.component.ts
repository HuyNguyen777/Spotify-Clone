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

  /*@Input() public playlistThumbnail!: string;
  @Input() public title!: string;
  @Input() public description!: string;
  @Input() public link!: string;
  @Input() public song_id!: string | number;
  constructor(private router: Router, private sd: SongDataService) {}

  ngOnInit(): void {}

  onNavigateToSong() {
    // this.sd.songData.next();
    this.router.navigateByUrl(`/song/${this.song_id}`, {
      state: {
        thumbnail: this.playlistThumbnail,
        title: this.title,
        description: this.description,
        link: this.link,
        id: this.song_id,
      },
    });
  }*/
    tracks: Track[] = [];

    constructor(private trackService: TrackService) {}
  
    ngOnInit(): void {
      this.trackService.getTracks().subscribe(data => {
        this.tracks = data;
        
      });
    }
}

