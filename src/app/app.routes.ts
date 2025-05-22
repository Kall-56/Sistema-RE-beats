import { Routes } from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', //Path que se especifica en el html anchor "<a>"
    component: LogInComponent, //Componente al que lleva
    title: 'Inicio de Sesion', //Titulo de la pagina
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Re:BEATS',
    children: [
      { path : '',
        component: DashboardComponent
      }
    ]
  }
];

export default routes;
