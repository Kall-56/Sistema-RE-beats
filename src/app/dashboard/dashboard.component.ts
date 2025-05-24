import { Component } from '@angular/core';
import {CancionComponent} from '../cancion/cancion.component';
import {NgForOf} from '@angular/common';
import {PlaylistComponent} from '../playlist/playlist.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    CancionComponent,
    NgForOf,
    PlaylistComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  canciones = [1,2,3,4];
}
