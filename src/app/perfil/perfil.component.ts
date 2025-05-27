import {Component, inject, OnInit} from '@angular/core';
import {Usuario} from '../log-in/Usuario.interface';
import {PlaylistComponent} from '../playlist/playlist.component';
import {NgForOf} from '@angular/common';
import {Playlist} from '../playlist/playlist.interface';
import {LogInService} from "../log-in/log-in.service";

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
  private logInService: LogInService = inject(LogInService);

  User!: Usuario;
  UserPlaylists: Playlist[] = [];

  ngOnInit() {
    const unknowUser = this.logInService.getUser();
    if (unknowUser !== null) {
      this.User = unknowUser;

      this.UserPlaylists = this.User?.Playlists || [];
    }
  }
}
