import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Artist {
  artist_id: number;
  popularity_score: number;
  name: string;
  gener: string;  
  artist_img: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  private apiUrl = 'http://localhost:8000/api/artists/';

  constructor(private http: HttpClient) {}

  // Lấy tất cả các nghệ sĩ
  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl);
  }

  // Lấy một nghệ sĩ cụ thể theo ID
  getArtistName(id: number): Observable<{ name: string }> {
    return this.http.get<{ name: string }>(`${this.apiUrl}${id}/`);
  }
}
