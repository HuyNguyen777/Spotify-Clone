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
  private baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  createArtist(formData: FormData){
    return this.http.post(`${this.apiUrl}`, formData);
  }

  updateArtist(id: number, formData: FormData){
    return this.http.put(`${this.apiUrl}${id}/`, formData);
  }

  deleteArtist(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }

  // Lấy tất cả các nghệ sĩ
  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.apiUrl);
  }

  // Lấy một nghệ sĩ cụ thể theo ID
  getArtistName(id: number): Observable<{ name: string }> {
    return this.http.get<{ name: string }>(`${this.apiUrl}${id}/`);
  }
}
