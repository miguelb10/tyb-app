import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Caja } from './caja';

@Injectable({
  providedIn: 'root'
})
export class CajaService {

  private urlEndPoint: string = URL_BACKEND + '/api/cajas';
  constructor(private http: HttpClient, private router: Router) { }
  getCajas(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('CajaService: tap 1');
        (response.content as Caja[]).forEach( caja => {
          console.log(caja.motivo);
        })
      }),
      map(response => {
        (response.content as Caja[]).map( caja => {
          caja.motivo = caja.motivo.toUpperCase();
          return caja;
        });
        return response;
      }),
      tap(response => {
        console.log('CajaService: tap 2');
        (response.content as Caja[]).forEach( caja => {
          console.log(caja.motivo);
        })
      })
    );
  }

  create(caja: Caja) : Observable<Caja>{
    return this.http.post(this.urlEndPoint, caja).pipe(
      map((ressponse: any) => ressponse.caja as Caja),
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

  getCaja(id): Observable<Caja>{
    return this.http.get<Caja>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/cajas']);
          if(e.error.mensaje){
            console.error(e.error.mensaje);
          }
        }
        return throwError(e);
      })
    );
  }

  update(caja: Caja): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${caja.id}`, caja).pipe(
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

  delete(id: number): Observable<Caja>{
    return this.http.delete<Caja>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
