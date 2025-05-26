import { Component, Input, OnInit } from '@angular/core';
import { Cancion } from '../cancion/cancion.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cancion-interface',
  imports: [],
  templateUrl: './cancion-interface.component.html',
  styleUrl: './cancion-interface.component.css'
})

export class CancionInterfaceComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  cancion:Cancion = {titulo:'default', autor:'default', genero:'default', fecha:'default', imagen:'default', Comentarios:['default'], Links:['default']};

  ngOnInit() {
    const titulo = this.route.snapshot.paramMap.get('titulo');
  }
}
