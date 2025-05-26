import {Component, Input} from '@angular/core';
import {Playlist} from './playlist.interface';

@Component({
  selector: 'app-playlist',
  imports: [],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  @Input() playlist!: Playlist;
}
