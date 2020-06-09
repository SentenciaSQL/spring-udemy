import { Injectable } from '@angular/core';
import { CLIENTES } from '../data/clientes.json';
import { Cliente } from '../models/cliente.js';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.js';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = environment.url;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient, private router: Router) { }

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
    return this.http.post(this.url + 'clientes', cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

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
    return this.http.get<Cliente>(this.url + 'clientes/' + id).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.log(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(this.url + 'clientes/' + cliente.id, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

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
    return this.http.delete<Cliente>(this.url + 'clientes/' + id, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<Cliente> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(this.url + 'clientes/upload', formData).pipe(
      map( (response: any) => response.cliente as Cliente ),
      catchError(e => {
        console.log(e.error.mensaje);
        Swal.fire('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

}
