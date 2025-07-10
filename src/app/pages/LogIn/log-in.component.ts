import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationService} from '../../authentication.service';
import {GlobalService} from '../../global.service';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-LogIn',
    imports: [CommonModule, RouterLink],
    templateUrl: './log-in.component.html',
    styleUrl: './log-in.component.css'
})
export class LogInComponent {
    private logInService: AuthenticationService = inject(AuthenticationService);
    private globalService: GlobalService = inject(GlobalService);

    logIn(nombre: string, clave: string) {
        if (!nombre || !clave) {
            console.error('Introduzca los datos');
        }
        else {
            this.logInService.getUserConfirmation(nombre,clave).subscribe({
                next: response => {
                  console.log(response);
                  this.logInService.setUser(response);
                  this.globalService.AppRouter.navigate(['/home']).catch(error => {
                    console.error('Error de navegación:', error);
                  });
                },
                error: error => {
                  console.error('Error:', error);
                  window.alert(error.error.error);
                }
              }
            );
        }
    }
}
