import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { SongComponent } from './pages/song/song.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { AdminComponent } from './pagesadmin/admin/admin.component';
import { adminGuard } from './guards/admin.guard';
import { ChatComponent } from './pages/chat/chat.component';
import { SearchUsersComponent } from './pages/search-users/search-users.component';
import { UsersComponent } from './pagesadmin/users/users.component';
import { UserGroupComponent } from './pagesadmin/user-group/user-group.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { ArtistComponent } from './pagesadmin/artist/artist.component';
import { CategoryComponent } from './pagesadmin/category/category.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { AlbumComponent } from './pagesadmin/album/album.component';
import { SongsListComponent } from './pagesadmin/songs-list/songs-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, 
    children:[
      { path: 'users', component: UsersComponent },
      { path: 'user-group', component: UserGroupComponent },
      { path: 'artist', component: ArtistComponent},
      { path: 'category', component: CategoryComponent },
      { path: 'album', component: AlbumComponent },
      { path: 'song', component: SongsListComponent }
    ] },
  { path: 'login', component: LoginComponent },
  //{ path: 'song/:song_id', component: SongComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'playlist', component: PlaylistComponent},
  { path: 'register', component: SignupComponent },
  { path: 'chat/:chatId', component: ChatComponent },
  { path: 'search', component: SearchUsersComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}