import {Component, inject, OnInit} from '@angular/core';
import {GlobalService} from '../../global.service';
import {Cancion} from '../../models/cancion.interface';
import {CancionCardComponent} from '../../shared/CancionCard/cancion-card.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-AllCanciones',
  imports: [
    CancionCardComponent,
    NgForOf
  ],
  templateUrl: './all-canciones.component.html',
  styleUrl: './all-canciones.component.css'
})
export class AllCancionesComponent implements OnInit {
  globalService: GlobalService = inject(GlobalService);
  canciones: Cancion[] = [];

  ngOnInit() {
    this.globalService.getCatalogoCanciones().subscribe(canciones => {
        this.canciones = canciones;
    });
  }
}
