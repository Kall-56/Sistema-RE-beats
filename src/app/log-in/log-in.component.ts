import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Usuario} from './Usuario.interface';
import {LogInService} from './log-in.service';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  logInService: LogInService = inject(LogInService);

  constructor() {}

  logIn(nombre: string, clave: string) {
    if (!nombre || !clave) {
      console.error('Introduzca los datos');
      return;
    }
  }
}
