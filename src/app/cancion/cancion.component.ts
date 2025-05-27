import { Component, Input, ViewEncapsulation} from '@angular/core';
import { Cancion } from './cancion.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancion',
  imports: [],
  templateUrl: './cancion.component.html',
  styleUrl: './cancion.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CancionComponent {
  @Input() cancion!: Cancion;
  @Input() username!: string;

  constructor(private router: Router) {}

  verDetalleCancion(cancion: Cancion) {
    this.router.navigate(['/home/cancion', cancion.titulo]);
  }
}
