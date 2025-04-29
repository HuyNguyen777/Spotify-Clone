import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { SongComponent } from './pages/song/song.component';
import { SignupComponent } from './pages/signup/signup.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { AdminComponent } from './pagesadmin/admin/admin/admin.component';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard]},
  { path: 'login', component: LoginComponent },
  //{ path: 'song/:song_id', component: SongComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'playlist', component: PlaylistComponent},
  { path: 'register', component: SignupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}