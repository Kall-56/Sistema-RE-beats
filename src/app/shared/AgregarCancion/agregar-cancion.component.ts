import {Component, Input, OnInit} from '@angular/core';
import {Playlist} from '../../models/playlist.interface';
import {AuthenticationService} from '../../authentication.service';
import {Usuario} from '../../models/usuario.interface';
import {GlobalService} from '../../global.service';
import {NgForOf} from '@angular/common';
import {Cancion} from '../../models/cancion.interface';

@Component({
  selector: 'app-AgregarCancion',
  imports: [
    NgForOf
  ],
  templateUrl: './agregar-cancion.component.html',
  styleUrl: './agregar-cancion.component.css'
})
export class AgregarCancionComponent implements OnInit{
  user!: Usuario;
  playlists: Playlist[] = [];
  @Input() cancion!: Cancion;

  constructor(private authService: AuthenticationService,
              protected globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.globalService.getPlaylistsUser(this.user.id).subscribe(playlists => {
      this.playlists = playlists;
    });
  }

  agregarCancion(idUsuario: number , idPlaylist: number, idCancion: number): void {
    console.log(idUsuario,idPlaylist,idCancion);
    this.globalService.agregarCancionAPlaylist(idUsuario,idPlaylist,idCancion).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    });
  }

}
