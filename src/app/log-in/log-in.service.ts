import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from './Usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class LogInService {
  private backUrl = 'http://localhost:8080/user';
  private http: HttpClient = inject(HttpClient);

  constructor() {
  }

  getUserConfirmation(nombre: string, clave: string): Observable<Usuario> {
    const url = `${this.backUrl}/Login`;
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('clave', clave);

    return this.http.get<Usuario>(url,{params});
  }

  createUser(nombre: string, clave: string): Observable<any>{
    const url = `${this.backUrl}/CrearUsuario`;
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('clave', clave);

    return this.http.post(url, null,{params});

  }
}
