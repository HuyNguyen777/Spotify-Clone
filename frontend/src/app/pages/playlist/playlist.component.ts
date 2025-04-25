import { Component } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css'],
  standalone: false,
})
export class PlaylistComponent {
  playlistName = 'My Playlist #3';
  playlistId = 'user';
}
