import {Component, inject, OnInit} from '@angular/core';
import {Usuario} from '../../models/usuario.interface';
import {PlaylistCardComponent} from '../../shared/PlaylistCard/playlist-card.component';
import {NgForOf} from '@angular/common';
import {Playlist} from '../../models/playlist.interface';
import {GlobalService} from '../../global.service';
import { ActivatedRoute } from '@angular/router';

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
  private globalService: GlobalService = inject(GlobalService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  User!: Usuario;
  UserPlaylists: Playlist[] = [];

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.globalService.getObject<Usuario>(id,'/MostrarUsuario').subscribe(usuario => {
      this.User = usuario;
    });
    this.globalService.getPlaylistsUser(id).subscribe(playlists => {
      this.UserPlaylists = playlists;
    });
  }
}
