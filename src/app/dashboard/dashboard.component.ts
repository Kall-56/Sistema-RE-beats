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
  canciones: Cancion[] = [];
  private globalService: GlobalService = inject(GlobalService);
  User!: Usuario;
  UserPlaylists: Playlist[] = [];

  constructor() {
  }

  ngOnInit() {
    const unknowUser = this.globalService.userConnected;
    if (unknowUser !== null) {
      this.User = unknowUser;
    }
    this.UserPlaylists = this.User?.Playlists || [];
    this.UserPlaylists.forEach(playlist => {
      (playlist.Canciones || []).forEach(cancion => {
        if (cancion) {
          this.canciones.push(cancion);
        }
      })
    })
  }
}
