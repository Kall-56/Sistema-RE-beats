import {inject, Injectable} from '@angular/core';
import {Usuario} from './log-in/Usuario.interface';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
    userConnected: Usuario | null = null;
    AppRouter: Router = inject(Router);
    constructor() { }
}
