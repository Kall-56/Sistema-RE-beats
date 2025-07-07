import {Component, inject, OnInit} from '@angular/core';
import {CancionCardComponent} from '../../shared/CancionCard/cancion-card.component';
import {NgForOf} from '@angular/common';
import {PlaylistCardComponent} from '../../shared/PlaylistCard/playlist-card.component';
import {GlobalService} from '../../global.service';
import {Usuario} from '../../models/usuario.interface';
import {Playlist} from '../../models/playlist.interface';
import {Cancion} from '../../models/cancion.interface';
import {AuthenticationService} from "../../authentication.service";

@Component({
  selector: 'app-Dashboard',
  imports: [
    CancionCardComponent,
    NgForOf,
    PlaylistCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  private globalService: GlobalService = inject(GlobalService);
  User!: Usuario;
  canciones: Cancion[] = [];
  playlists: Playlist[] = [];
  misCanciones: Cancion[] = [];

  constructor(private AuthService: AuthenticationService) {
  }

  ngOnInit() {
    this.User = this.AuthService.getUser();

    this.globalService.getPlaylistsAmigos(this.User.amigos).subscribe({
      next: value => {
        console.log(value);
        this.playlists = value;
      },
      error: err => console.error(err)
    });

    this.globalService.getCancionesAmigos(this.User.amigos).subscribe({
      next: value => {
        console.log(value);
        this.canciones = value;
      },
      error: err => console.error(err)
    });

    this.globalService.getCancionesUser(this.User.id).subscribe({
      next: value => {
        console.log(value);
        this.misCanciones = value;
      },
      error: err => console.error(err)
    });
  }
}
