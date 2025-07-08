import {Component, inject, OnInit} from '@angular/core';
import {Usuario} from '../../models/usuario.interface';
import {PlaylistCardComponent} from '../../shared/PlaylistCard/playlist-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {Playlist} from '../../models/playlist.interface';
import {GlobalService} from '../../global.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-PerfilView',
  imports: [
    PlaylistCardComponent,
    NgForOf,
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './perfil-view.component.html',
  styleUrl: './perfil-view.component.css'
})
export class PerfilViewComponent implements OnInit{
  private globalService: GlobalService = inject(GlobalService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthenticationService);
  userPerfil!: Usuario;
  user!: Usuario;
  UserPlaylists: Playlist[] = [];
  nuevaPlaylist: string = '';
  amigos: Usuario[] = [];

  editingPerfil: boolean = false;
  nuevoNombre: string = '';


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.user = this.authService.getUser();
    this.globalService.getObject<Usuario>(id,'/MostrarUsuario').subscribe(usuario => {
      this.userPerfil = usuario;
      this.globalService.getAmigos(usuario.amigos).subscribe(amigos => {
        if (amigos !== undefined) {
          this.amigos = amigos;
        }
      });
    });
    this.globalService.getPlaylistsUser(id).subscribe(playlists => {
      this.UserPlaylists = playlists;
    });
  }

  crearPlaylist() {
    this.globalService.crearPlaylist(this.user.id,this.nuevaPlaylist).subscribe({
      next: response => {
        console.log(response);
        window.location.reload();
      },
      error: err => console.error(err)
    });
  }

  editarNombre() {
    this.globalService.editarNombre(this.user.id,this.nuevoNombre).subscribe(response => {
      console.log(response);
      this.editingPerfil = false;
      window.location.reload();
    });
  }
}
