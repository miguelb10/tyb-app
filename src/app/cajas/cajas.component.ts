import { Component, OnInit } from '@angular/core';
import { Caja } from './caja';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators'
import { URL_BACKEND } from '../config/config';
import { CajaService } from './caja.service';
import { AuthService } from '../usuarios/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrls: ['./cajas.component.css']
})
export class CajasComponent implements OnInit {

  cajas: Caja[];
  paginador: any;
  linkPaginador: string;
  cajaSeleccionado: Caja;
  urlBackend: string = URL_BACKEND;

  constructor(private cajaService: CajaService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      let page = 0;
      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page');
        if(!page){
          page = 0;
        }
      this.cajaService.getCajas(page).pipe(
        tap(response => {
            console.log('CajaComponent: tap 3');
            (response.content as Caja[]).forEach( caja => {
              console.log(caja.motivo);
            });
        })
        ).subscribe(
        response => {
          this.cajas = response.content as Caja[]
          this.paginador = response;
          this.linkPaginador = 'cajas/page';
        });
      });
    }

    delete(caja: Caja): void {
      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar al registro ${caja.motivo}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.cajaService.delete(caja.id).subscribe(
            response => {
              this.cajas = this.cajas.filter(cli => cli !==caja)
              swalWithBootstrapButtons.fire(
                'Registro eliminado!',
                `Registro ${caja.motivo} eliminado con éxito`,
                'success'
              )
            }
          )
        }
      });
    }
}
