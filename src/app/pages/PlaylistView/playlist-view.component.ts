import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CancionCardComponent} from '../../shared/CancionCard/cancion-card.component';
import {NgForOf} from '@angular/common';
import {Playlist} from '../../models/playlist.interface';
import {GlobalService} from '../../global.service';
import {Cancion} from '../../models/cancion.interface';

@Component({
  selector: 'app-PlaylistView',
  imports: [
    CancionCardComponent,
    NgForOf
  ],
  templateUrl: './playlist-view.component.html',
  styleUrl: './playlist-view.component.css'
})
export class PlaylistViewComponent implements OnInit{
  globalService: GlobalService = inject(GlobalService);
  playlist!: Playlist;
  canciones: Cancion[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.globalService.getObject<Playlist>(id,'/MostrarPlaylists').subscribe(playlist => {
      this.playlist = playlist;
      this.globalService.getCancionesPlaylist(this.playlist.canciones).subscribe(canciones => {
        this.canciones = canciones;
      });
    });
  }
}
