// track.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from './artists.service';
import { Album } from './albums.service';
export interface Track {
  track_id: number;
  title: string;
  is_copyright: boolean;
  price: number;
  image_url: string;
  release_date: string;
  namemp3: string;
  artist: number;
  album: number;
}

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  getSongCards() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000/api/tracks/';
  private baseUrl = 'http://localhost:8000/api/';


  constructor(private http: HttpClient) {}

  getTracks(): Observable<Track[]> {
    return this.http.get<Track[]>(this.apiUrl);
  }
  // track.service.ts
  getTracksByTitle(title: string): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiUrl}?title=${encodeURIComponent(title)}`);
  }
  addTrackToPlaylist(playlistId: number, trackId: number): Observable<any> {
    return this.http.post('/api/playlistdetail/add-track/', {
      playlist_id: playlistId,
      track_id: trackId
    });
  }
  createTrack(formData: FormData) {
    return this.http.post(`${this.baseUrl}tracks/`, formData);
  }

 // Nếu chưa có model, có thể để any[]
getArtists(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}artists/`);
}

getAlbums(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}albums/`);
}


  
}
