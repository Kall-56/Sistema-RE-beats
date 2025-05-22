import { Component } from '@angular/core';
import {CancionComponent} from '../cancion/cancion.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CancionComponent,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  canciones = [1,2,3,4];
}
