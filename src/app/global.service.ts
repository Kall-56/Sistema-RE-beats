import {inject, Injectable} from '@angular/core';
import {Usuario} from './models/usuario.interface';
import {Router} from '@angular/router';
import {Playlist} from "./models/playlist.interface";
import {Cancion} from "./models/cancion.interface";
import {HttpClient, HttpParams} from "@angular/common/http";
import {forkJoin, map, Observable, switchMap} from "rxjs";
import {Comentario} from './models/comentario.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  AppRouter: Router = inject(Router);
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
    } else if (endUrl === '/ConsultarComentarios') {
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

  getAmigos(idsAmigos: number[]): Observable<Usuario[]> {
    return this.getListaObjects<Usuario>(idsAmigos,this.getObject.bind(this),'/MostrarUsuario');
  }

  editarNombre(id: number, nombre: string): Observable<any> {
    const params = new HttpParams()
      .set('idUsuario', id)
      .set('nuevoNombre', nombre);

    return this.http.post(this.backUrl+'/EditarNombre', null,{params});
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

  getComentariosCancion(idCancion: number): Observable<Comentario[]> {
    const params: HttpParams = new HttpParams().set('idCancion', idCancion);

    return this.http.get<Comentario[]>(this.backUrl+'/ConsultarComentarios',{params});
  }

  getCatalogoCanciones(): Observable<Cancion[]> {
    return this.http.get<Cancion[]>(this.backUrl+'/CatalogoCanciones');
  }

  getCatalogoPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.backUrl+'/MostrarTodasPlaylists');
  }

  registrarCancion(idUsuario: number, titulo: string, autor: string, fecha: string, imagen: string): Observable<any> {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('titulo', titulo)
      .set('autor', autor)
      .set('fecha', fecha)
      .set('imagen', imagen);

    return this.http.post(this.backUrl+'/CrearCancion', null,{params});
  }

  editarCancion(idUsuario: number,idCancion: number, titulo: string, autor: string, fecha: string, imagen: string, links: string): Observable<any> {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('idCancion', idCancion)
      .set('nuevoTitulo', titulo)
      .set('nuevoAutor', autor)
      .set('nuevaFecha', fecha)
      .set('nuevaImagen', imagen)
      .set('links',links);

    return this.http.post(this.backUrl+'/EditarCancion', null,{params});
  }

  eliminarCancion(idCancion: number, idUsuario: number): Observable<any> {
    const params = new HttpParams()
      .set('idCancion', idCancion)
      .set('idUsuario', idUsuario);

    return this.http.post(this.backUrl+'/EliminarCancion', null,{params});
  }

  crearPlaylist(idUsuario: number, titulo: string): Observable<any> {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('descripcion', titulo);

    return this.http.post(this.backUrl+'/CrearPlaylist', null,{params});
  }

  crearComentario(idCancion: number, idUsuario: number, comentario: string): Observable<any> {
    const params = new HttpParams()
      .set('idCancion', idCancion)
      .set('idUsuario', idUsuario)
      .set('comentarioTexto', comentario);

    return this.http.post(this.backUrl+'/CrearComentario', null,{params});
  }

  agregarCancionAPlaylist(idUsuario: number, idPlaylist: number, idCancion: number): Observable<any> {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('idPlaylist', idPlaylist)
      .set('idCancion', idCancion);

    return this.http.post(this.backUrl+'/AgregarCancionAPlaylist', null,{params});
  }

  eliminarComentario(idComentario: number, idUsuario: number): Observable<any> {
    const params = new HttpParams()
      .set('idComentario', idComentario)
      .set('idUsuario', idUsuario);

    return this.http.post(this.backUrl+'/EliminarComentario', null,{params});
  }

  editarComentario(idComentario: number, idUsuario: number, comentario: string): Observable<any> {
    const params = new HttpParams()
      .set('idComentario', idComentario)
      .set('idUsuario', idUsuario)
      .set('nuevoComentario', comentario);

    return this.http.post(this.backUrl+'/EditarComentario', null,{params});
  }

  editarNombrePlaylist(idUsuario: number, idPlaylist: number, nuevoTitulo: string): Observable<any> {
    const params = new HttpParams()
      .set('idPlaylist', idPlaylist)
      .set('idUsuario', idUsuario)
      .set('nuevoTitulo', nuevoTitulo);

    return this.http.post(this.backUrl+'/EditarPlaylist', null,{params});
  }

  agregarPlaylist(idUsuario: number, idPlaylist: number): Observable<any> {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('idPlaylist', idPlaylist);

    return this.http.post(this.backUrl+'/AgregarPlaylistAUsuario', null,{params});
  }

  quitarPlaylist(idUsuario: number, idPlaylist: number): Observable<any> {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('idPlaylist', idPlaylist);

    return this.http.post(this.backUrl+'/EliminarPlaylistDeUsuario', null,{params});
  }
}
