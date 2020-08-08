import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Letra } from './letra';

@Injectable({
  providedIn: 'root'
})
export class LetraService {

  private urlEndPoint: string = URL_BACKEND + '/api/letras';
  constructor(private http: HttpClient, private router: Router) { }
  getLetras(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('LetraService: tap 1');
        (response.content as Letra[]).forEach( letra => {
          console.log(letra.nombre);
        })
      }),
      map(response => {
        (response.content as Letra[]).map( letra => {
          letra.nombre = letra.nombre.toUpperCase();
          return letra;
        });
        return response;
      }),
      tap(response => {
        console.log('LetraService: tap 2');
        (response.content as Letra[]).forEach( letra => {
          console.log(letra.nombre);
        })
      })
    );
  }

  create(letra: Letra) : Observable<Letra>{
    return this.http.post(this.urlEndPoint, letra).pipe(
      map((ressponse: any) => ressponse.letra as Letra),
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

  getLetra(id): Observable<Letra>{
    return this.http.get<Letra>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/letras']);
          if(e.error.mensaje){
            console.error(e.error.mensaje);
          }
        }
        return throwError(e);
      })
    );
  }

  update(letra: Letra): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${letra.id}`, letra).pipe(
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

  delete(id: number): Observable<Letra>{
    return this.http.delete<Letra>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
