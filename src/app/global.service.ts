import {inject, Injectable} from '@angular/core';
import {Usuario} from './log-in/Usuario.interface';
import {Router} from '@angular/router';
import {Playlist} from "./playlist/playlist.interface";
import {Cancion} from "./cancion/cancion.interface";
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
    userConnected: Usuario | null = null;
    AppRouter: Router = inject(Router);
    playlistActual: Playlist | null = null;
    cancionActual: Cancion | undefined = undefined;

    private backUrl = 'http://localhost:8080/user';
    private http: HttpClient = inject(HttpClient);
    constructor() { }

    cancionesDeAmigos(nombres: string[]): Cancion[] {
        const url = `${this.backUrl}/MostrarPlaylists`;
        let canciones: Cancion[] = [];

        nombres.forEach(nombre => {
            const params = new HttpParams()
                .set('nombre', nombre);

            this.http.get<Playlist[]>(url,{params})?.subscribe({
                next: response => {
                    response.forEach(playlist => {
                        playlist.Canciones.forEach(cancion => {
                            canciones.push(cancion);
                        });
                    });
                },
                error: error => console.error('Error:', error)
            });
        });

        return canciones;
    }

    playlistsDeAmigos(nombres: string[]): Observable<Playlist[]> {
        const url = `${this.backUrl}/MostrarPlaylists`;
        const requests = nombres.map(nombre => {
            const params = new HttpParams().set('nombre', nombre);
            return this.http.get<Playlist[]>(url, { params });
        });

        return forkJoin(requests).pipe(
            map(responses => responses.flat())
        );
    }

    registrarCancion(titulo: string, autor: string, genero: string, fecha: string, imagen: string): Observable<any> {
        const url = `http://localhost:8080/admin/CrearCancion`;
        const params = new HttpParams()
            .set('titulo', titulo)
            .set('autor', autor)
            .set('genero', genero)
            .set('fecha', fecha)
            .set('imagen', imagen);

        return this.http.post(url, null,{params});
    }
}
