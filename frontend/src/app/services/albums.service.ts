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
  private baseUrl = 'http://localhost:8000/api/';
  
  constructor(private http: HttpClient) {}

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  getAlbumName(id: number): Observable<{ title: string }> {
    return this.http.get<{ title: string }>(`${this.apiUrl}${id}/`);
  }

  createAlbum(formData: FormData){
    return this.http.post(`${this.apiUrl}`, formData);
  }

  updateAlbum(id: number, formData: FormData){
    return this.http.put(`${this.apiUrl}${id}/`, formData);
  }

  deleteAlbum(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
  
  getArtistName(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}artists/`);
  }


}
