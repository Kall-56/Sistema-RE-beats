import {Component, inject} from '@angular/core';
import {LogInService} from '../../log-in.service';
import {RouterLink} from '@angular/router';
import {GlobalService} from '../../global.service';

@Component({
  selector: 'app-Registration',
  imports: [
    RouterLink
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  private logInService: LogInService = inject(LogInService);
  private globalService: GlobalService = inject(GlobalService);

  constructor() {
  }

  register(nombre: string, clave: string, clave2: string) {
    if (!nombre || !clave || !clave2) {
      console.error('Introduzca los datos');

    } else if (clave !== clave2) {
      console.error('Las contraseñas tienen que ser iguales');

    } else {
      this.logInService.createUser(nombre, clave)?.subscribe(
        {
          next: response => console.log('Usuario creado:', response),
          error: error => console.error('Error:', error)
        }
      );
      setTimeout(() => {
        this.globalService.AppRouter.navigate(['/']);
      },1000);
    }
  }
}
