import { Component, OnInit } from '@angular/core';
import { Letra } from './letra';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators'
import { URL_BACKEND } from '../config/config';
import { LetraService } from './letra.service';
import { AuthService } from '../usuarios/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-letras',
  templateUrl: './letras.component.html',
  styleUrls: ['./letras.component.css']
})
export class LetrasComponent implements OnInit {

  letras: Letra[];
  paginador: any;
  linkPaginador: string;
  cajaSeleccionado: Letra;
  urlBackend: string = URL_BACKEND;

  constructor(private letraService: LetraService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      let page = 0;
      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page');
        if(!page){
          page = 0;
        }
      this.letraService.getLetras(page).pipe(
        tap(response => {
            console.log('LetraComponent: tap 3');
            (response.content as Letra[]).forEach( letra => {
              console.log(letra.nombre);
            });
        })
        ).subscribe(
        response => {
          this.letras = response.content as Letra[]
          this.paginador = response;
          this.linkPaginador = 'letras/page';
        });
      });
    }

    delete(letra: Letra): void {
      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar al registro ${letra.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.letraService.delete(letra.id).subscribe(
            response => {
              this.letras = this.letras.filter(cli => cli !==letra)
              swalWithBootstrapButtons.fire(
                'Registro eliminado!',
                `Registro ${letra.nombre} eliminado con éxito`,
                'success'
              )
            }
          )
        }
      });
    }
}
