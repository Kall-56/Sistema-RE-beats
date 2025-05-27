import {Component, inject, OnInit} from '@angular/core';
import {GlobalService} from '../global.service';
import {Usuario} from '../log-in/Usuario.interface';
import {PlaylistComponent} from '../playlist/playlist.component';
import {NgForOf} from '@angular/common';
import {Playlist} from '../playlist/playlist.interface';

@Component({
  selector: 'app-perfil',
  imports: [
    PlaylistComponent,
    NgForOf
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  private globalService: GlobalService = inject(GlobalService);
  User!: Usuario;
  UserPlaylists: Playlist[] = [];

  ngOnInit() {
    const unknowUser = this.globalService.userConnected;
    if (unknowUser !== null) {
      this.User = unknowUser;

      this.UserPlaylists = this.User?.Playlists || [];
    }
  }
}
