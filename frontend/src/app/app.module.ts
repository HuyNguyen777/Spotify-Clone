import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { SongCardComponent } from './components/song-card/song-card.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowseCardComponent } from './components/browse-card/browse-card.component';
import { SongComponent } from './pages/song/song.component';
import { ArtistCardComponent } from "./components/artist-card/artist-card.component";
import { HttpClientModule } from '@angular/common/http'; 
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ChatComponent } from './pages/chat/chat.component';
import { SearchUsersComponent } from './pages/search-users/search-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    PlaylistComponent,
    SignupComponent,
    LoginComponent,
    SongCardComponent,
    TopNavComponent,
    ButtonComponent,
    BrowseCardComponent,
    SongComponent,
    ArtistCardComponent,
    MusicPlayerComponent,
    LoginDialogComponent,
    ChatComponent,
    SearchUsersComponent
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    
    
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}