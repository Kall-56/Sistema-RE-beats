import {inject, Injectable} from '@angular/core';
import {Usuario} from './log-in/Usuario.interface';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
    userConnected: Observable<Usuario> | null | undefined = null;
    AppRouter: Router = inject(Router);
    constructor() { }
}
