import {Component, inject, Input, OnInit} from '@angular/core';
import {Playlist} from '../../models/playlist.interface';
import {Router} from '@angular/router';
import {GlobalService} from "../../global.service";
import {NgIf} from '@angular/common';
import {AuthenticationService} from '../../authentication.service';
import {Usuario} from '../../models/usuario.interface';

@Component({
  selector: 'app-playlist',
  imports: [
    NgIf
  ],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.css'
})
export class PlaylistCardComponent implements OnInit{
  @Input() playlist!: Playlist;
  globalService: GlobalService = inject(GlobalService);
  authService = inject(AuthenticationService);
  user!: Usuario;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  verDetallePlaylist(playlist: Playlist) {
    this.router.navigate(['/home/playlist', playlist.id]);
  }

  agregarPlaylist() {
    this.globalService.agregarPlaylist(this.user.id,this.playlist.id).subscribe(response => {
      console.log(response);
      this.user.playlists.push(this.playlist.id);
    });
  }

  quitarPlaylist() {
    this.globalService.quitarPlaylist(this.user.id,this.playlist.id).subscribe(response => {
      console.log(response);
      this.user.playlists.flatMap(id => {
        if (id === this.playlist.id) {
          return [];
        } else {
          return id;
        }
      })
    });
  }

  navegarPerfil() {
    this.router.navigate(['/home/PerfilView', this.playlist.idPropietario]);
  }
}
