import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../global.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {AuthenticationService} from '../../authentication.service';
import {Usuario} from '../../models/usuario.interface';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-CrearCancion',
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './crear-cancion.component.html',
  styleUrl: './crear-cancion.component.css'
})
export class CrearCancionComponent implements OnInit, OnDestroy{
  globalService: GlobalService = inject(GlobalService);
  authService = inject(AuthenticationService);
  User!: Usuario;
  form: FormGroup;
  selectedImageFile: File | null = null;
  previewUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      fecha: ['', Validators.required],
      imagen: [null, Validators.required],
      links: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.User = this.authService.getUser();
  }

  registarCancion() {
    console.log(this.form.value);
    if (this.form.valid) {
      const titulo: string = this.form.value.titulo;
      const autor: string = this.form.value.autor;
      const fecha: string = this.form.value.fecha.toString();
      const imagen = this.selectedImageFile!.toString();
      const links: string = this.form.value.links;
      this.globalService.registrarCancion(this.User.id,titulo,autor,fecha,imagen).subscribe({
        next: response => {
          console.log(response);
          this.globalService.AppRouter.navigate(['/home/catalogo']).catch(error =>
            console.error('Error de navegación:', error)
          );
        },
        error: error => console.log(error)
      });
    }
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
    }
  }
}
