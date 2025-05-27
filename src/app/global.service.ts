import {inject, Injectable} from '@angular/core';
import {Usuario} from './log-in/Usuario.interface';
import {Router} from '@angular/router';
import {Playlist} from "./playlist/playlist.interface";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
    userConnected: Usuario | null = null;
    AppRouter: Router = inject(Router);
    playlistActual: Playlist | null = null;
    constructor() { }
}
