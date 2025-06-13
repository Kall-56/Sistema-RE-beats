import {Component, inject, OnInit} from '@angular/core';
import {Usuario} from '../../models/usuario.interface';
import {PlaylistCardComponent} from '../../shared/PlaylistCard/playlist-card.component';
import {NgForOf} from '@angular/common';
import {Playlist} from '../../models/playlist.interface';
import {LogInService} from "../../log-in.service";

@Component({
  selector: 'app-PerfilView',
  imports: [
    PlaylistCardComponent,
    NgForOf
  ],
  templateUrl: './perfil-view.component.html',
  styleUrl: './perfil-view.component.css'
})
export class PerfilViewComponent implements OnInit{
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
