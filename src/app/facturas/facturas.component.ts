import { Component, OnInit } from '@angular/core';
import { Factura } from './factura';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators'
import { URL_BACKEND } from '../config/config';
import { FacturaService } from './factura.service';
import { AuthService } from '../usuarios/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  facturas: Factura[];
  semaforo: boolean;
  paginador: any;
  linkPaginador: string;
  facturaSeleccionado: Factura;
  urlBackend: string = URL_BACKEND;

  constructor(private facturaService: FacturaService,
    public modalService: ModalService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      let page = 0;
      this.activatedRoute.paramMap.subscribe(params => {
        let page = +params.get('page');
        if(!page){
          page = 0;
        }
      this.facturaService.getFacturas(page).pipe(
        tap(response => {
            console.log('FacturaComponent: tap 3');
            (response.content as Factura[]).forEach( factura => {
              console.log(factura.descripcion);
            });
        })
        ).subscribe(
        response => {
          this.facturas = response.content as Factura[]
          this.paginador = response;
          this.linkPaginador = 'facturas/page';
        });
      });
    }

    delete(factura: Factura): void {
      const swalWithBootstrapButtons = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar al registro ${factura.descripcion}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.facturaService.delete(factura.id).subscribe(
            response => {
              this.facturas = this.facturas.filter(fac => fac !==factura)
              swalWithBootstrapButtons.fire(
                'Registro eliminado!',
                `Registro ${factura.descripcion} eliminado con éxito`,
                'success'
              )
            }
          )
        }
      });
    }

    abrirModal(){
      this.semaforo = true;
      this.modalService.abirModal();
    }
}
