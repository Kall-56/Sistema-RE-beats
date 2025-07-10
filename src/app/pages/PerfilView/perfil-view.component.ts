import {Component, inject, OnInit} from '@angular/core';
import {Usuario} from '../../models/usuario.interface';
import {PlaylistCardComponent} from '../../shared/PlaylistCard/playlist-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {Playlist} from '../../models/playlist.interface';
import {GlobalService} from '../../global.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
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
  private router: Router = inject(Router);
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
          console.log('Amigos cargados:', this.amigos);
          console.log('Cantidad de amigos:', this.amigos.length);
          
          // Verificar que todos los amigos tengan IDs válidos
          this.amigos.forEach((amigo, index) => {
            console.log(`Amigo ${index}:`, amigo);
            if (!amigo.id || amigo.id <= 0) {
              console.error(`Amigo ${index} tiene ID inválido:`, amigo.id);
            }
          });
        } else {
          console.log('No se encontraron amigos');
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

  navegarAperfil(idAmigo: number, event?: Event) {
    if (event) {
      event.preventDefault();
    }
    
    console.log('Intentando navegar al perfil del amigo con ID:', idAmigo);
    console.log('Amigo objeto completo:', this.amigos.find(a => a.id === idAmigo));
    
    if (idAmigo && idAmigo > 0) {
      // Intentar con el router del GlobalService primero
      try {
        this.globalService.AppRouter.navigate(['/home/PerfilView', idAmigo]);
      } catch (error) {
        console.log('Error con GlobalService router, intentando con router directo:', error);
        // Respaldo con el router directo
        this.router.navigate(['/home/PerfilView', idAmigo]);
      }
    } else {
      console.error('ID de amigo inválido:', idAmigo);
      window.alert('Error: ID de amigo inválido');
    }
  }

  // Método de prueba para verificar navegación
  probarNavegacion() {
    console.log('Probando navegación...');
    console.log('URL actual:', window.location.href);
    console.log('Router actual:', this.router.url);
    
    // Intentar navegar a un perfil de prueba
    const primerAmigo = this.amigos[0];
    if (primerAmigo) {
      console.log('Navegando al primer amigo:', primerAmigo);
      this.navegarAperfil(primerAmigo.id);
    } else {
      console.log('No hay amigos para probar');
    }
  }
}
