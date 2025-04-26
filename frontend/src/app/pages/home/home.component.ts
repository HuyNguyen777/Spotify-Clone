import { Component, OnInit } from '@angular/core';
import { TrackService, Track } from '../../services/tracks.service';  // Import đúng Track và TrackService
import { SearchBarService } from '../../services/searchbar.service';
import { Artist, ArtistService } from '../../services/artists.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone:false,
})
export class HomeComponent implements OnInit {
  public browserAll = [
    { bgColor: 'red', color: 'white', title: 'Podcasts' },
    { bgColor: 'green', color: 'white', title: 'Made for you' },
    { bgColor: 'purple', color: 'white', title: 'Charts' },
    { bgColor: 'blue', color: 'white', title: 'Live streams' },
    { bgColor: 'pink', color: 'white', title: 'Bollywood' },
    { bgColor: 'lightblue', color: 'white', title: 'Punjabi' },
    { bgColor: 'orange', color: 'white', title: 'Tamil' },
    { bgColor: 'yellow', color: 'white', title: 'Telugu' },
    { bgColor: 'black', color: 'white', title: 'Marathi' },
    { bgColor: 'orangered', color: 'white', title: 'Hip-Hop' },
    { bgColor: 'darkgray', color: 'white', title: 'Workout' },
    { bgColor: 'smokewhite', color: 'white', title: 'R&B' }
  ];

  public songCards: Track[] = [];  // Định nghĩa songCards là Track[]
  artistNames: { [key: number]: string } = {};


  constructor(private trackService: TrackService,public sb: SearchBarService,private artistService: ArtistService,private router:Router) {}

  ngOnInit(): void {
    this.trackService.getTracks().subscribe((tracks) => {
      this.songCards = tracks;
      // Lấy tên nghệ sĩ tương ứng
      tracks.forEach((track) => {
        if (track.artist && !this.artistNames[track.artist]) {
          this.artistService.getArtistName(track.artist).subscribe((res) => {
            this.artistNames[track.artist] = res.name;
          });
        }
      });
    });
  }
  onInputFilterRes($event: string) {
    const res = this.browserAll.filter(
      (element) => element.title.toLowerCase() === $event.toLowerCase().trim()
    );
    console.log(res);
  }

  onNavigation(pageName: string) {
    if (pageName == 'search') {
      this.sb.isSearchVisible.next(true);
    } else {
      this.sb.isSearchVisible.next(false);
    }
    
  }
    
    
  getArtistName(artistId: number): string {
    return this.artistNames[artistId] || 'Unknown';
  }
  
}