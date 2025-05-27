import { Routes } from '@angular/router';

import { LogInComponent} from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { CancionInterfaceComponent } from './cancion-interface/cancion-interface.component';
import { CrearCancionComponent } from './crear-cancion/crear-cancion.component';
import {PerfilComponent} from './perfil/perfil.component';
import {InterfaceVerCancionesComponent} from './interface-ver-canciones/interface-ver-canciones.component';


const routes: Routes = [
  {
    path: '', //Path que se especifica en el html anchor "<a>"
    component: LogInComponent, //Componente al que lleva
    title: 'Inicio de Sesion', //Titulo de la pagina
  },
  {
    path: 'registration', //Path que se especifica en el html anchor "<a>"
    component: RegistrationComponent, //Componente al que lleva
    title: 'Inicio de Sesion', //Titulo de la pagina
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Re:BEATS',
    children: [
      { path : '',
        component: DashboardComponent
      },
      { path: 'cancion/:titulo', 
        component: CancionInterfaceComponent 
      },
      { path: 'crear-cancion',
        component: CrearCancionComponent
      },
      { path : 'perfil',
        component: PerfilComponent
      },
      { path : 'canciones/:Descripcion',
        component: InterfaceVerCancionesComponent
      }
    ]
  }
];

export default routes;
