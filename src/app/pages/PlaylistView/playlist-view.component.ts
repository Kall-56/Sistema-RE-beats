import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CancionCardComponent} from '../../shared/CancionCard/cancion-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {Playlist} from '../../models/playlist.interface';
import {GlobalService} from '../../global.service';
import {Cancion} from '../../models/cancion.interface';
import {FormsModule} from '@angular/forms';
import {Usuario} from '../../models/usuario.interface';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-PlaylistView',
  imports: [
    CancionCardComponent,
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './playlist-view.component.html',
  styleUrl: './playlist-view.component.css'
})
export class PlaylistViewComponent implements OnInit{
  globalService: GlobalService = inject(GlobalService);
  authService = inject(AuthenticationService);
  user!: Usuario;
  playlist!: Playlist;
  canciones: Cancion[] = [];
  nuevaPlaylist: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.globalService.getObject<Playlist>(id,'/MostrarPlaylists').subscribe(playlist => {
      this.playlist = playlist;
      this.globalService.getCancionesPlaylist(this.playlist.canciones).subscribe(canciones => {
        this.canciones = canciones;
      });
    });
  }

  editarNombrePlaylist() {
    this.globalService.editarNombrePlaylist(this.user.id,this.playlist.id,this.nuevaPlaylist!).subscribe({
      next: response => {
        console.log(response);
      }
    });
  }
}
