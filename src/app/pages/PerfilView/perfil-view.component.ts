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
  idPerfil!: number;
  nombre: string | undefined;
  user!: Usuario;
  UserPlaylists: Playlist[] = [];
  nuevaPlaylist: string = '';
  amigos: Usuario[] = [];

  editingPerfil: boolean = false;
  nuevoNombre: string = '';


  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.idPerfil = id;
    this.user = this.authService.getUser();
    window.alert(this.user.amigos);
    this.globalService.getObject<Usuario>(id,'/MostrarUsuario').subscribe(usuario => {
      this.nombre = usuario.nombre;
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
        window.alert(response.mensaje);
        window.location.reload();
      },
      error: err => console.error(err)
    });
  }

  editarNombre() {
    this.globalService.editarNombre(this.user.id,this.nuevoNombre).subscribe(response => {
      console.log(response);
      this.editingPerfil = false;
      this.user.nombre = this.nuevoNombre;
      this.authService.setUser(this.user);
      window.alert(response.mensaje);
      window.location.reload();
    });
  }

  eliminarPerfil() {
    const confirmado = window.confirm('¿Desea ELIMINAR su perfil? (Esta accion es irreversible)');
    if (confirmado) {
      this.globalService.eliminarPerfil(this.user.id,this.idPerfil).subscribe(response => {
        console.log(response);
        console.log('Elemento eliminado');
        this.globalService.AppRouter.navigate(['']);
      })
    } else {
      console.log('Eliminación cancelada');
    }
  }

  agregarAmigo() {
    this.globalService.agregarAmigo(this.user.id,this.idPerfil).subscribe(response => {
      console.log(response);
      this.user.amigos.push(this.idPerfil);
      this.authService.clearUser();
      this.authService.setUser(this.user);
      window.alert(response.mensaje);
    });
  }

  quitarAmigo() {
    this.globalService.quitarAmigo(this.user.id,this.idPerfil).subscribe(response => {
      console.log(response);
      this.user.amigos = this.user.amigos.filter(id => id !== this.idPerfil);
      this.authService.clearUser();
      this.authService.setUser(this.user);
      window.alert(response.mensaje);
    });
  }

  verperfil(amigo: Usuario) {
    this.globalService.AppRouter.navigate(['/home/PerfilView', amigo.id]);
    window.location.reload();
  }
}
