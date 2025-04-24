import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css'],
  standalone:false,
})
export class ArtistCardComponent {
  @Input() artistImage!: string;
  @Input() artistName!: string;
  @Input() artistDescription!: string;

  onNavigateToArtist() {
    // logic điều hướng đến trang nghệ sĩ
    console.log('Đi tới nghệ sĩ:', this.artistName);
  }
}
