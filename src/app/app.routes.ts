import { Routes } from '@angular/router';

import { LogInComponent} from './pages/LogIn/log-in.component';
import { RootPageComponent } from './RootPage/root-page.component';
import { DashboardComponent } from './pages/Dashboard/dashboard.component';
import { RegistrationComponent } from './pages/Registration/registration.component';
import { CancionViewComponent } from './pages/CancionView/cancion-view.component';
import { CrearCancionComponent } from './pages/CrearCancion/crear-cancion.component';
import {PerfilViewComponent} from './pages/PerfilView/perfil-view.component';
import {PlaylistViewComponent} from './pages/PlaylistView/playlist-view.component';
import {AllCancionesComponent} from './pages/AllCanciones/all-canciones.component';


const routes: Routes = [
  {
    path: '', //Path que se especifica en el html anchor "<a>"
    component: LogInComponent, //Componente al que lleva
    title: 'Inicio de Sesion', //Titulo de la pagina
  },
  {
    path: 'Registration', //Path que se especifica en el html anchor "<a>"
    component: RegistrationComponent, //Componente al que lleva
    title: 'Inicio de Sesion', //Titulo de la pagina
  },
  {
    path: 'home',
    component: RootPageComponent,
    title: 'Re:BEATS',
    children: [
      { path : '',
        component: DashboardComponent
      },
      { path : 'PerfilView/:id',
        component: PerfilViewComponent
      },
      { path : 'cancion/:id',
        component: CancionViewComponent
      },
      { path : 'playlist/:id',
        component: PlaylistViewComponent
      },
      { path : 'catalogo',
        component: AllCancionesComponent
      },
      { path: 'CrearCancion',
        component: CrearCancionComponent
      },
    ]
  }
];

export default routes;
