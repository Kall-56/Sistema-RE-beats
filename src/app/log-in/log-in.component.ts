import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogInService} from './log-in.service';
import {GlobalService} from '../global.service';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-log-in',
    imports: [CommonModule, RouterLink],
    templateUrl: './log-in.component.html',
    styleUrl: './log-in.component.css'
})
export class LogInComponent {
    private logInService: LogInService = inject(LogInService);
    private globalService: GlobalService = inject(GlobalService);

    constructor() {}

    logIn(nombre: string, clave: string) {
        if (!nombre || !clave) {
            console.error('Introduzca los datos');
        }
        else {
            /*this.globalService.userConnected = this.logInService.getUserConfirmation(nombre,clave);
            if (this.globalService.userConnected === undefined) {
                console.error('No se encontro al usuario');
            }
            else {
                this.globalService.AppRouter.navigate(['/home']);
            }*/
          this.globalService.AppRouter.navigate(['/home']);
        }
    }
}
