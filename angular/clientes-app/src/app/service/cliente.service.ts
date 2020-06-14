import { Injectable } from '@angular/core';
//import { CLIENTES } from '../data/clientes.json';
import { Cliente } from '../models/cliente.js';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment.js';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { Region } from '../models/region.js';
import { AuthService } from './auth.service.js';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if(token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    if(e.status == 401) {
      this.router.navigate(['/login']);
      return true;
    }

    if(e.status == 403) {
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso`, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }


    return false;
  }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.url + 'clientes/regiones', {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  // getClientes(): Observable<Cliente[]> {
  //   return this.http.get<Cliente[]>(this.url + 'clientes');
  //   //return of(CLIENTES);
  // }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.url + 'clientes/page/' + page).pipe(
      map((response: any) => {
        // (response.content as Cliente[]).map(cliente => {
        //   cliente.nombre = cliente.nombre.toUpperCase();
        //
        //   return cliente;
        // });
        return response;
      })
    );

  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post(this.url + 'clientes', cliente, {headers: this.agregarAuthorizationHeader()}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        // Validacion de Spring Boot
        if(e.status == 400) {
          return throwError(e);
        }

        console.log(e.error.mensaje);
        Swal.fire('Error al crear', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  getClienete(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.url + 'clientes/' + id, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(this.url + 'clientes/' + cliente.id, cliente, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        // Validacion de Spring Boot
        if(e.status == 400) {
          return throwError(e);
        }

        console.log(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(this.url + 'clientes/' + id, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        console.log(e.error.mensaje);
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;

    if(token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', this.url + 'clientes/upload', formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

    // .pipe(
    //   map( (response: any) => response.cliente as Cliente ),
    //   catchError(e => {
    //     console.log(e.error.mensaje);
    //     Swal.fire('Error al eliminar', e.error.mensaje, 'error');
    //     return throwError(e);
    //   })
    // );
  }

}
