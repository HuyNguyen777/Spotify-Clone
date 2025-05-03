// music-player.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Track } from './tracks.service';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {
  private trackQueue = new BehaviorSubject<Track[]>([]);
  private currentTrack = new BehaviorSubject<Track | null>(null);

  trackQueue$ = this.trackQueue.asObservable();
  currentTrack$ = this.currentTrack.asObservable();

  setQueueAndPlay(tracks: Track[], selectedTrack: Track) {
    this.trackQueue.next(tracks);
    this.currentTrack.next(selectedTrack);
  }
}
