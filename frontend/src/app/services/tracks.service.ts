// track.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from './artists.service';

export interface Track {
  track_id: number;
  title: string;
  album_id: number;
  artist_id: number;
  is_copyright: boolean;
  price: string;
  image_url: string;
  release_date: string;
  namemp3: string;
  artist: Artist;
}

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  getSongCards() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000/api/tracks/';

  constructor(private http: HttpClient) {}

  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(this.apiUrl);
  }
  getArtistName(track: Track): string {
    return track.artist ? track.artist.name : 'Unknown Artist';  // Trả về tên nghệ sĩ hoặc 'Unknown Artist'
  }
}
