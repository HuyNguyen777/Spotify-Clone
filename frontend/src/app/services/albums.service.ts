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

  private apiUrl = 'http://localhost:8000/api/album/';

  constructor(private http: HttpClient) {}

  getAlbumName(id: number): Observable<{ title: string }> {
    return this.http.get<{ title: string }>(`${this.apiUrl}${id}/`);
  }
}
