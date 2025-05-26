import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Cancion} from './cancion.interface';

@Component({
  selector: 'app-cancion',
  imports: [
  ],
  templateUrl: './cancion.component.html',
  styleUrl: './cancion.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CancionComponent {
  @Input() cancion!: Cancion;
}
