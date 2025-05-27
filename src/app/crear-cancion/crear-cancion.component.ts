import {Component, inject} from '@angular/core';
import {GlobalService} from '../global.service';
import { FormsModule } from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-crear-cancion',
  imports: [FormsModule, NgForOf],
  templateUrl: './crear-cancion.component.html',
  styleUrl: './crear-cancion.component.css'
})
export class CrearCancionComponent {
  globalService: GlobalService = inject(GlobalService);
  titulo="";
  autor="";
  genero="";
  fecha: Date = new Date();
  generos: string[] = ['Blues', 'Jazz', 'Rock', 'Clasica', 'Pop', 'Metal'];
  imagenCancion!: File;
  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files?.length) {
  //     this.imagenCancion = input.files[0];
  //   }
  // }
  registarCancion(titulo: string, autor: string, genero: string, fecha: Date, imagen: string) {
    console.log(titulo,autor,genero,fecha.toString(),imagen);
    this.globalService.registrarCancion(titulo,autor,genero,fecha.toString(),imagen).subscribe({
      next: response => {
        console.log(response);

      },
      error: error => console.log(error)
    });
  }
}
