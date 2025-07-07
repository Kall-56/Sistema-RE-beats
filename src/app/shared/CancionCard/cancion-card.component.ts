import {Component, inject, Input, ViewEncapsulation} from '@angular/core';
import { Cancion } from '../../models/cancion.interface';
import { Router } from '@angular/router';
import {GlobalService} from "../../global.service";

@Component({
  selector: 'app-cancion',
  imports: [],
  templateUrl: './cancion-card.component.html',
  styleUrl: './cancion-card.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CancionCardComponent {
  @Input() cancion!: Cancion;
  //@Input() username!: string;
  private globalService: GlobalService = inject(GlobalService);

  constructor(private router: Router) {}

  verDetalleCancion(cancion: Cancion) {
    this.router.navigate(['/home/cancion', cancion.id]);
  }
}
