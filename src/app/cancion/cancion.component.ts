import {Component, inject, Input, ViewEncapsulation} from '@angular/core';
import { Cancion } from './cancion.interface';
import { Router } from '@angular/router';
import {GlobalService} from "../global.service";

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
  globalService: GlobalService = inject(GlobalService);

  constructor(private router: Router) {}

  verDetalleCancion(cancion: Cancion) {
    this.globalService.cancionActual = cancion;
    this.router.navigate(['/home/cancion', cancion.titulo]);
  }
}
