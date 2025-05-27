import {Component, inject, OnInit} from '@angular/core';
import { Cancion } from '../cancion/cancion.interface';
import { ActivatedRoute } from '@angular/router';
import {GlobalService} from '../global.service';

@Component({
  selector: 'app-cancion-interface',
  imports: [],
  templateUrl: './cancion-interface.component.html',
  styleUrl: './cancion-interface.component.css'
})

export class CancionInterfaceComponent implements OnInit {
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
