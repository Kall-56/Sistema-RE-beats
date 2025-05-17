import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import routeConfig from './app/app.routes';
//import { appConfig } from './app/app.config'; No se que hace appConfig, esta por default [NO borrar porsia]

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig)],
}).catch((err) => console.error(err));

/*bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));*/
