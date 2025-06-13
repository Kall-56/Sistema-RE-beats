import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CancionCardComponent} from '../../shared/CancionCard/cancion-card.component';
import {NgForOf} from '@angular/common';
import {Playlist} from '../../models/playlist.interface';
import {GlobalService} from '../../global.service';

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
