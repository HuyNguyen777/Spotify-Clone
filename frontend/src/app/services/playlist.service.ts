import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Playlist {
    playlist_id: number;
    name: string;
    ispublic: boolean;
    releasedate: Date;
    user_id: number;
}
@Injectable({
    providedIn: 'root'
  })
export class PlaylistService {
    constructor(private http: HttpClient) {}
    getPlaylist(userid: number): Observable<Playlist[]> {
        return this.http.get<Playlist[]>(`http://localhost:8000/api/playlists/${userid}/`);
      }
}