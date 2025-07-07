import {inject, Injectable} from '@angular/core';
import {Usuario} from './models/usuario.interface';
import {Router} from '@angular/router';
import {Playlist} from "./models/playlist.interface";
import {Cancion} from "./models/cancion.interface";
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  AppRouter: Router = inject(Router);
  playlistActual: Playlist | null = null;
  private http: HttpClient = inject(HttpClient);
  private backUrl = 'http://localhost:8080/user';

  verPerfil(usuario: Usuario) {
    this.AppRouter.navigate(['/home/PerfilView', usuario.id]);
  }

  getObject<T>(id:number, endUrl: string): Observable<T> {
    let params: HttpParams;
    if (endUrl === '/MostrarPlaylists') {
      params = new HttpParams().set('idPlaylist', id);
    } else if (endUrl === '/MostrarCancion') {
      params = new HttpParams().set('idCancion', id);
    } else {
      params = new HttpParams().set('id', id);
    }

    return this.http.get<T>(this.backUrl+endUrl,{params}).pipe(
      map((res: T | T[]) => Array.isArray(res) ? res[0] : res)
    );
  }

  getListaObjects<T>(ids: number[], method: (id: number, endUrl: string) => Observable<T>, endUrl: string): Observable<T[]> {
    const requests = ids.map(id => method(id, endUrl));
    return forkJoin(requests);
  }

  getPlaylistsAmigos(idsAmigos: number[]): Observable<Playlist[]> {
    return this.getListaObjects<Usuario>(idsAmigos, this.getObject.bind(this), '/MostrarUsuario').pipe(
      map(listaAmigos => listaAmigos.flatMap(usuario => usuario.playlists ?? [])),
      switchMap(listaIds => this.getListaObjects<Playlist>(
        listaIds.map(p => p), this.getObject.bind(this), '/MostrarPlaylists'
      ))
    );
  }

  getCancionesAmigos(idsAmigos: number[]): Observable<Cancion[]> {
    return this.getPlaylistsAmigos(idsAmigos).pipe(
      map(listaPlaylists => listaPlaylists.flatMap(playlist => playlist.canciones ?? [])),
      switchMap(listaIds => this.getListaObjects<Cancion>(
        listaIds.map(c => c), this.getObject.bind(this), '/MostrarCancion'
      ))
    );
  }

  getPlaylistsUser(idUser: number): Observable<Playlist[]> {
    return this.getObject<Usuario>(idUser, '/MostrarUsuario').pipe(
      switchMap(user => this.getListaObjects<Playlist>(
        user.playlists, this.getObject.bind(this), '/MostrarPlaylists'
      ))
    );
  }

  getCancionesUser(idUser: number): Observable<Cancion[]> {
    return this.getPlaylistsUser(idUser).pipe(
      map(listaPlaylists => listaPlaylists.flatMap(playlist => playlist.canciones ?? [])),
      switchMap(listaIds => this.getListaObjects<Cancion>(
        listaIds.map(c => c), this.getObject.bind(this), '/MostrarCancion'
      ))
    );
  }

  getCancionesPlaylist(idCanciones: number[]): Observable<Cancion[]> {
    return this.getListaObjects<Cancion>(idCanciones,this.getObject.bind(this),'/MostrarCancion');
  }

  getCatalogoCanciones(): Observable<Cancion[]> {
    return this.http.get<Cancion[]>(this.backUrl+'/CatalogoCanciones');
  }

  registrarCancion(idUsuario: number, titulo: string, autor: string, fecha: string, imagen: string): Observable<any> {
      const url = `http://localhost:8080/user/CrearCancion`;
      const params = new HttpParams()
        .set('idUsuario', idUsuario)
        .set('titulo', titulo)
        .set('autor', autor)
        .set('fecha', fecha)
        .set('imagen', imagen);

      return this.http.post(url, null,{params});
  }
}
