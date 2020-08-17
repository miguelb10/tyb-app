import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Factura } from './factura';
import { Producto } from '../productos/producto';
import { Cliente } from '../clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private urlEndPoint: string = URL_BACKEND + '/api/facturas';
  constructor(private http: HttpClient, private router: Router) { }
  getFacturas(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('FacturaService: tap 1');
        (response.content as Factura[]).forEach( factura => {
          console.log(factura.descripcion);
        })
      }),
      map(response => {
        (response.content as Factura[]).map( factura => {
          factura.descripcion = factura.descripcion.toUpperCase();
          return factura;
        });
        return response;
      }),
      tap(response => {
        console.log('FacturaService: tap 2');
        (response.content as Factura[]).forEach( factura => {
          console.log(factura.descripcion);
        })
      })
    );
  }

  create(factura: Factura) : Observable<Factura>{
    return this.http.post(this.urlEndPoint, factura).pipe(
      map((ressponse: any) => ressponse.factura as Factura),
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  getFactura(id): Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/facturas']);
          if(e.error.mensaje){
            console.error(e.error.mensaje);
          }
        }
        return throwError(e);
      })
    );
  }

  update(factura: Factura): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${factura.id}`, factura).pipe(
      catchError(e => {
        if(e.status==400){
          return throwError(e);
        }
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Factura>{
    return this.http.delete<Factura>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  filtrarProductos(term: string): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar-productos/${term}`);
  }

  filtrarClientes(term: string): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.urlEndPoint}/filtrar-clientes/${term}`);
  }
}
