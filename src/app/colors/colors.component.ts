import { Component, OnInit } from '@angular/core';
import { Color } from './color';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators'
import { URL_BACKEND } from '../config/config';
import { ColorService } from './color.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.css']
})
export class ColorsComponent implements OnInit {

  colors: Color[];
  paginador: any;
  linkPaginador: string;
  colorSeleccionado: Color;
  urlBackend: string = URL_BACKEND;
  constructor(private colorService: ColorService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let page = 0;
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page');
      if(!page){
        page = 0;
      }
    this.colorService.getColors(page).pipe(
      tap(response => {
          console.log('ColorComponent: tap 3');
          (response.content as Color[]).forEach( color => {
            console.log(color.nombre);
          });
      })
      ).subscribe(
      response => {
        this.colors = response.content as Color[]
        this.paginador = response;
        this.linkPaginador = 'colors/page';
      });
    });
  }

  delete(color: Color): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el color ${color.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.colorService.delete(color.id).subscribe(
          response => {
            this.colors = this.colors.filter(col => col !==color)
            swalWithBootstrapButtons.fire(
              'Color eliminado!',
              `Color ${color.nombre} eliminado con éxito`,
              'success'
            )
          }
        )
      }
    });
  }
}
