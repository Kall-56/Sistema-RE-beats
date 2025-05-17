import { Routes } from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';

const routes: Routes = [
  {
    path: '', //Path que se especifica en el html anchor "<a>"
    component: LogInComponent, //Componente al que lleva
    title: 'Inicio de Sesion', //Titulo de la pagina
  }
];

export default routes;
