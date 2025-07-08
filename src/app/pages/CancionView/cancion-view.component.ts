import {Component, inject, OnInit} from '@angular/core';
import { Cancion } from '../../models/cancion.interface';
import { ActivatedRoute } from '@angular/router';
import {GlobalService} from '../../global.service';
import {Comentario} from '../../models/comentario.interface';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Usuario} from '../../models/usuario.interface';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-CancionView',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './cancion-view.component.html',
  styleUrl: './cancion-view.component.css'
})

export class CancionViewComponent implements OnInit {
  globalService: GlobalService = inject(GlobalService);
  authService = inject(AuthenticationService);
  user!: Usuario;
  cancion!: Cancion;
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  editingid: number = -1;
  editingComentario: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.globalService.getObject<Cancion>(id,'/MostrarCancion').subscribe(cancion => {
      this.cancion = cancion;
      this.globalService.getComentariosCancion(this.cancion.id).subscribe(comentarios => {
        this.comentarios = comentarios;
      });
    });
  }

  enviarComentario() {
    if (!this.nuevoComentario.trim()) return;
    this.globalService.crearComentario(this.cancion.id,this.user.id,this.nuevoComentario).subscribe({
      next: response => {
        console.log(response);
        this.nuevoComentario = '';
        this.globalService.getComentariosCancion(this.cancion.id).subscribe(comentarios => {
          this.comentarios = comentarios;
        });
      }, error: err => console.error(err)
    });
  }

  editarComentario(idComentario: number) {
    this.globalService.editarComentario(idComentario,this.user.id,this.editingComentario).subscribe({
      next: response => {
        console.log(response);
        this.editingComentario = '';
        this.globalService.getComentariosCancion(this.cancion.id).subscribe(comentarios => {
          this.comentarios = comentarios;
        });
      }, error: err => console.error(err)
    });
    this.editingid = -1;
  }

  eliminarComentario(idComentario: number) {
    this.globalService.eliminarComentario(idComentario,this.user.id).subscribe({
      next: response => {
        console.log(response);
        this.globalService.getComentariosCancion(this.cancion.id).subscribe(comentarios => {
          this.comentarios = comentarios;
        });
      }, error: err => console.error(err)
    });
  }

  editarCancion() {

  }

  eliminarCancion() {

  }
}
