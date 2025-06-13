import {Component, inject, OnInit} from '@angular/core';
import { Cancion } from '../../models/cancion.interface';
import { ActivatedRoute } from '@angular/router';
import {GlobalService} from '../../global.service';

@Component({
  selector: 'app-CancionView',
  imports: [],
  templateUrl: './cancion-view.component.html',
  styleUrl: './cancion-view.component.css'
})

export class CancionViewComponent implements OnInit {
  globalService: GlobalService = inject(GlobalService);
  cancion: Cancion;

  constructor(private route: ActivatedRoute) {
      this.cancion = <Cancion>this.globalService.cancionActual;
  }


  ngOnInit() {
    const titulo = this.route.snapshot.paramMap.get('titulo');

    console.log(titulo);
    console.log(this.globalService.cancionActual);
  }
}
