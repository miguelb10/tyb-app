import { Injectable } from '@angular/core';
import { URL_BACKEND } from '../config/config';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Color } from './color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private urlEndPoint: string = URL_BACKEND + '/api/colors';
  constructor(private http: HttpClient, private router: Router) { }

  getColors(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ColorService: tap 1');
        (response.content as Color[]).forEach( color => {
          console.log(color.nombre);
        })
      }),
      map(response => {
        (response.content as Color[]).map( color => {
          color.nombre = color.nombre.toUpperCase();
          return color;
        });
        return response;
      }),
      tap(response => {
        console.log('ColorService: tap 2');
        (response.content as Color[]).forEach( color => {
          console.log(color.nombre);
        })
      })
    );
  }

  create(color: Color) : Observable<Color>{
    return this.http.post(this.urlEndPoint, color).pipe(
      map((ressponse: any) => ressponse.color as Color),
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

  getColor(id): Observable<Color>{
    return this.http.get<Color>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.status != 401 && e.error.mensaje){
          this.router.navigate(['/colors']);
          if(e.error.mensaje){
            console.error(e.error.mensaje);
          }
        }
        return throwError(e);
      })
    );
  }

  update(color: Color): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${color.id}`, color).pipe(
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

  delete(id: number): Observable<Color>{
    return this.http.delete<Color>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if(e.error.mensaje){
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }
}
