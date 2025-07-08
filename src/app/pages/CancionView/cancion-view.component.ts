import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { Cancion } from '../../models/cancion.interface';
import { ActivatedRoute } from '@angular/router';
import {GlobalService} from '../../global.service';
import {Comentario} from '../../models/comentario.interface';
import {NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Usuario} from '../../models/usuario.interface';
import {AuthenticationService} from '../../authentication.service';

@Component({
  selector: 'app-CancionView',
  imports: [
    NgForOf,
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './cancion-view.component.html',
  styleUrl: './cancion-view.component.css'
})

export class CancionViewComponent implements OnInit, OnDestroy {
  globalService: GlobalService = inject(GlobalService);
  authService = inject(AuthenticationService);
  user!: Usuario;
  cancion!: Cancion;
  editingCancion: boolean = false;
  form: FormGroup;
  selectedImageFile: File | null = null;
  previewUrl: string | null = null;

  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  editingid: number = -1;
  editingComentario: string = '';

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      fecha: ['', Validators.required],
      imagen: [null, Validators.required],
      links: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.globalService.getObject<Cancion>(id,'/MostrarCancion').subscribe(cancion => {
      this.cancion = cancion;
      this.globalService.getComentariosCancion(this.cancion.id).subscribe({
        next: comentarios => {
        this.comentarios = comentarios;
        },
        error: err => {
          if (err.status === 404) {
            console.log(err.error.mensaje);
          } else {
            console.error(err);
          }
        }
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
        this.globalService.getComentariosCancion(this.cancion.id).subscribe({
          next: comentarios => {
            this.comentarios = comentarios;
          },
          error: err => {
            if (err.status === 404) {
              console.log(err.error.mensaje);
              this.comentarios = [];
            } else {
              console.error(err);
            }
          }
        });
      },
      error: err => {console.error(err);}
    });
  }

  editarCancion() {
    console.log(this.form.value);
    if (this.form.valid) {
      const titulo: string = this.form.value.titulo;
      const autor: string = this.form.value.autor;
      const fecha: string = this.form.value.fecha.toString();
      const imagen = this.selectedImageFile!.toString();
      const links: string = this.form.value.links;
      this.globalService.editarCancion(this.user.id,this.cancion.id,titulo,autor,fecha,imagen,links).subscribe({
        next: response => {
          console.log(response);
          this.editingCancion = false;
          window.location.reload();
        },
        error: error => console.log(error)
      });
    }
  }

  eliminarCancion() {
    this.globalService.eliminarCancion(this.cancion.id,this.user.id).subscribe({
      next: response => {
        console.log(response);
        this.globalService.AppRouter.navigate(['/home/catalogoCanciones']).catch(error =>
          console.error('Error de navegación:', error)
        );
      }, error: err => console.error(err)
    });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      this.form.get('imagen')?.setErrors({ invalidType: true });
      this.selectedImageFile = null;
      this.previewUrl = null;
      return;
    }

    this.selectedImageFile = file;
    this.form.get('imagen')?.setErrors(null);
    this.previewUrl = URL.createObjectURL(file);
  }

  ngOnDestroy() {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl); // Prevent memory leaks
      this.previewUrl = null;
    }
  }
}
