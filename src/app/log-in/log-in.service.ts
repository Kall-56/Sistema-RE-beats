import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Usuario} from './Usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class LogInService {
  backUrl = 'http://localhost:3000/usuarios'
  constructor(/*private http: HttpClient*/) { }

  /*getUserConfirmation(nombre: string, clave: string): Observable<Usuario> | undefined {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('clave', clave);

    return this.http.get<Usuario>(this.backUrl, {params});
  }*/
}
