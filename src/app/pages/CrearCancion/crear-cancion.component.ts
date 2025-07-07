import {Component, inject, OnInit} from '@angular/core';
import {GlobalService} from '../../global.service';
import { FormsModule } from '@angular/forms';
import {NgForOf} from '@angular/common';
import {AuthenticationService} from '../../authentication.service';
import {Usuario} from '../../models/usuario.interface';

@Component({
  selector: 'app-CrearCancion',
  imports: [FormsModule, NgForOf],
  templateUrl: './crear-cancion.component.html',
  styleUrl: './crear-cancion.component.css'
})
export class CrearCancionComponent implements OnInit{
  globalService: GlobalService = inject(GlobalService);
  authService = inject(AuthenticationService);
  User!: Usuario;
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
  ngOnInit() {
    this.User = this.authService.getUser();
  }

  registarCancion(idUsuario: number, titulo: string, autor: string, fecha: Date, imagen: string) {
    console.log(idUsuario,titulo,autor,fecha.toString(),imagen);
    this.globalService.registrarCancion(idUsuario,titulo,autor,fecha.toString(),imagen).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error)
    });
  }
}
