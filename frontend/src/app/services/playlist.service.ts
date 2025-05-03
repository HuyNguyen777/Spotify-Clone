import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Playlist {
    playlist_id: number;
    name: string;
    ispublic: boolean;
    releasedate: string;
    user: number;
}
@Injectable({
    providedIn: 'root'
  })
export class PlaylistService {
    constructor(private http: HttpClient) {}
    getPlaylist(userid: number): Observable<Playlist[]> {
        return this.http.get<Playlist[]>(`http://localhost:8000/api/playlists/${userid}/`);
      }
      addTrackToPlaylist(playlistId: number, trackId: number): Observable<any> {
        return this.http.post('http://localhost:8000/api/playlistdetail/add-track/  ', {
          playlist_id: playlistId,
          track_id: trackId
        });
      }
      
}