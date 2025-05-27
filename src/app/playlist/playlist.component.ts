import {Component, inject, Input} from '@angular/core';
import {Playlist} from './playlist.interface';
import {Router} from '@angular/router';
import {GlobalService} from "../global.service";

@Component({
  selector: 'app-playlist',
  imports: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  @Input() playlist!: Playlist;
  globalService: GlobalService = inject(GlobalService);

  constructor(private router: Router) {}

  verDetallePlaylist(playlist: Playlist) {
    this.globalService.playlistActual = playlist;
    this.router.navigate(['/home/canciones', playlist.Descripcion]);
  }
}
