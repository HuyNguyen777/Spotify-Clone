import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
  standalone:false,
})
export class MusicPlayerComponent {
  isPlaying = false;
  currentTime = 2;    // 2s
  duration = 260;     // 4:20 phút = 260s

  togglePlay() {
    this.isPlaying = !this.isPlaying;
  }
}
