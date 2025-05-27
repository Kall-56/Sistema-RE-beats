import {Component, inject, OnInit} from '@angular/core';
import {CancionComponent} from '../cancion/cancion.component';
import {NgForOf} from '@angular/common';
import {PlaylistComponent} from '../playlist/playlist.component';
import {GlobalService} from '../global.service';
import {Usuario} from '../log-in/Usuario.interface';
import {Playlist} from '../playlist/playlist.interface';
import {Cancion} from '../cancion/cancion.interface';

@Component({
  selector: 'app-dashboard',
  imports: [
    CancionComponent,
    NgForOf,
    PlaylistComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  private globalService: GlobalService = inject(GlobalService);
  User!: Usuario;
  nombre: string = 'default';
  canciones: Cancion[] = [];
  Playlists: Playlist[] = [];
  misCanciones: Cancion[] = [];

  constructor() {
  }

  ngOnInit() {
    const unknowUser = this.globalService.userConnected;
    if (unknowUser !== null) {
      this.User = unknowUser;

      // Limpia los arrays antes de llenarlos
      this.Playlists = this.User.Playlists ? [...this.User.Playlists] : [];
      this.misCanciones = [];
      this.User.Playlists.forEach(playlist => {
        (playlist.Canciones || []).forEach(cancion => {
          if (cancion) {
            this.misCanciones.push(cancion);
          }
        });
      });
      this.nombre = unknowUser.nombre;

      this.canciones = this.globalService.cancionesDeAmigos(unknowUser.Amigos);

      // Limpia las playlists antes de agregar las de amigos
      this.globalService.playlistsDeAmigos(unknowUser.Amigos).subscribe(playlists => {
        // Solo agrega las playlists de amigos, no las del usuario
        this.Playlists = this.User.Playlists ? [...this.User.Playlists] : [];
        playlists.forEach(playlist => {
          this.Playlists.push(playlist);
        });
      });
    }
  }
}
