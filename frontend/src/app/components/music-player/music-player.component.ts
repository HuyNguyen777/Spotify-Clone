import { Component, ElementRef, ViewChild } from '@angular/core';
import { Track } from '../../services/tracks.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css'],
  standalone:false,
})
export class MusicPlayerComponent {
  isPlaying = false;
  isImage?: string;
  currentTime = 0;
  totalTime = 0;
  progress = 0;
  volume: number = 1;
  isMuted: boolean = false;

  currentQueue: Track[] = [];
  currentQueueIndex = 0;

  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef<HTMLAudioElement>;

  togglePlay() {
    const audio = this.audioPlayer.nativeElement;
    if (this.isPlaying) {
      audio.pause();
      this.isImage ="pause.png";
    } else {
      audio.play();
      this.isImage = "play.png";
    }
    this.isPlaying = !this.isPlaying;
  }

  onTimeUpdate() {
    const audio = this.audioPlayer.nativeElement;
    this.currentTime = audio.currentTime;
    this.totalTime = audio.duration;
    this.progress = (audio.currentTime / audio.duration) * 100;
  }

  seek(event: MouseEvent) {
    const progressBar = (event.target as HTMLElement).closest('.progress-bar') as HTMLElement;
    if (progressBar) {
      const rect = progressBar.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      const audio = this.audioPlayer.nativeElement;
      audio.currentTime = percentage * audio.duration;
    }
  }

  repeat() {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = 0;
    audio.play();
  }

  shuffle() {
    if (this.currentQueue.length > 1) {
      const randomIndex = Math.floor(Math.random() * this.currentQueue.length);
      this.currentQueueIndex = randomIndex;
      this.playSongFromQueue();
    }
  }

  nextSong() {
    if (this.currentQueue.length > 0) {
      this.currentQueueIndex = (this.currentQueueIndex + 1) % this.currentQueue.length;
      this.playSongFromQueue();
    }
  }

  prevSong() {
    if (this.currentQueue.length > 0) {
      this.currentQueueIndex = (this.currentQueueIndex - 1 + this.currentQueue.length) % this.currentQueue.length;
      this.playSongFromQueue();
    }
  }

  playSongFromQueue() {
    const audio = this.audioPlayer.nativeElement;
    if (this.currentQueue.length > 0) {
      const song = this.currentQueue[this.currentQueueIndex];
      audio.src = song.namemp3;
      audio.load();
      audio.play();
      this.isPlaying = true;
    }
  }

  setQueueAndPlay(songs: Track[], clickedSong: Track) {
    this.currentQueue = [...songs];
    this.currentQueueIndex = this.currentQueue.findIndex(song => song.namemp3 === clickedSong.namemp3);
    if (this.currentQueueIndex === -1) {
      this.currentQueueIndex = 0;
    }
    this.playSongFromQueue();
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  }

  changeVolume(event: Event) {
    const audio = this.audioPlayer.nativeElement;
    const input = event.target as HTMLInputElement;
    this.volume = parseFloat(input.value);
    audio.volume = this.volume;
    this.isMuted = this.volume === 0;
  }

  toggleVolume(){
    const audio = this.audioPlayer.nativeElement;
    this.isMuted = !this.isMuted;
    audio.muted = this.isMuted;
  
    if (this.isMuted) {
      this.volume = 0;
    } else {
      this.volume = 1;
    }
    audio.volume = this.volume;
  }

  getVolumeBackground(): string {
    const percentage = this.volume * 100;
    return `linear-gradient(to right, white ${percentage}%, #555 ${percentage}%)`;
  }
}
