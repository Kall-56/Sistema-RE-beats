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
  private storageKey = 'currentUser';

  constructor() {
  }
  setUser(user: any): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUser(): any {
    const user = sessionStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : null;
  }

  clearUser(): void {
    sessionStorage.removeItem(this.storageKey);
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
