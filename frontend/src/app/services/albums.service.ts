import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Album {
  album_id: number;
  title: string;
  deception: string
  total_tracks: number;
  releasedate: string;
  artist: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private apiUrl = 'http://localhost:8000/api/albums/';

  constructor(private http: HttpClient) {}

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  getAlbumName(id: number): Observable<{ title: string }> {
    return this.http.get<{ title: string }>(`${this.apiUrl}${id}/`);
  }
}
