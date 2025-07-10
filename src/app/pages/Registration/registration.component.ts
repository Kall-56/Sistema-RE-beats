import {Component, inject} from '@angular/core';
import {AuthenticationService} from '../../authentication.service';
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
  private logInService: AuthenticationService = inject(AuthenticationService);
  private globalService: GlobalService = inject(GlobalService);


  register(nombre: string, clave: string, clave2: string) {
    if (!nombre || !clave || !clave2) {
      console.error('Introduzca los datos');

    } else if (clave !== clave2) {
      console.error('Las contraseñas tienen que ser iguales');

    } else {
      this.logInService.createUser(nombre, clave).subscribe(
        {
          next: response => {
            console.log(response);
            window.alert(response.mensaje);
            this.globalService.AppRouter.navigate(['/']).catch(error => {
              console.error('Error de navegación:', error);
            });
          },
          error: error => {
            console.error('[Error]:', error);
            window.alert(error.message);
          }
        }
      );
    }
  }
}
