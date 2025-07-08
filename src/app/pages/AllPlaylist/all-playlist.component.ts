import {Component, inject} from '@angular/core';
import {NgForOf} from '@angular/common';
import {PlaylistCardComponent} from '../../shared/PlaylistCard/playlist-card.component';
import {Playlist} from '../../models/playlist.interface';
import {GlobalService} from '../../global.service';

@Component({
  selector: 'app-AllPlaylist',
  imports: [
    NgForOf,
    PlaylistCardComponent
  ],
  templateUrl: './all-playlist.component.html',
  styleUrl: './all-playlist.component.css'
})
export class AllPlaylistComponent {
  globalService: GlobalService = inject(GlobalService);
  playlists: Playlist[] = [];
}
