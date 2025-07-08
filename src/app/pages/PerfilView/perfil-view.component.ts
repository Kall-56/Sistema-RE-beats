import {Component, inject, OnInit} from '@angular/core';
import {Usuario} from '../../models/usuario.interface';
import {PlaylistCardComponent} from '../../shared/PlaylistCard/playlist-card.component';
import {NgForOf} from '@angular/common';
import {Playlist} from '../../models/playlist.interface';
import {GlobalService} from '../../global.service';
import { ActivatedRoute } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-PerfilView',
  imports: [
    PlaylistCardComponent,
    NgForOf,
    FormsModule
  ],
  templateUrl: './perfil-view.component.html',
  styleUrl: './perfil-view.component.css'
})
export class PerfilViewComponent implements OnInit{
  private globalService: GlobalService = inject(GlobalService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  User!: Usuario;
  UserPlaylists: Playlist[] = [];
  nuevaPlaylist: string = '';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.globalService.getObject<Usuario>(id,'/MostrarUsuario').subscribe(usuario => {
      this.User = usuario;
      if (id !== this.User.id) {

      }
    });
    this.globalService.getPlaylistsUser(id).subscribe(playlists => {
      this.UserPlaylists = playlists;
    });
  }

  crearPlaylist() {
    this.globalService.crearPlaylist(this.User.id,this.nuevaPlaylist).subscribe({
      next: response => {
        console.log(response);
        window.location.reload();
      },
      error: err => console.error(err)
    });
  }
}
