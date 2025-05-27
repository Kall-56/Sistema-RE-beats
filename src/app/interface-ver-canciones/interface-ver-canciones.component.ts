import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CancionComponent} from '../cancion/cancion.component';
import {NgForOf} from '@angular/common';
import {Playlist} from '../playlist/playlist.interface';
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-interface-ver-canciones',
  imports: [
    CancionComponent,
    NgForOf
  ],
  templateUrl: './interface-ver-canciones.component.html',
  styleUrl: './interface-ver-canciones.component.css'
})
export class InterfaceVerCancionesComponent implements OnInit{
  playlist: Playlist | undefined;
  globalService: GlobalService = inject(GlobalService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const desc = this.route.snapshot.paramMap.get('Descripcion');
    if (this.globalService.playlistActual !== null) {
      this.playlist = this.globalService.playlistActual;
    }
    console.log(desc);
  }
}
