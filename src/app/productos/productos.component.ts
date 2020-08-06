import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators'
import { URL_BACKEND } from '../config/config';
import { ProductoService } from './producto.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[];
  paginador: any;
  productoSeleccionado: Producto;
  urlBackend: string = URL_BACKEND;
  constructor(private productoService: ProductoService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let page = 0;
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page');
      if(!page){
        page = 0;
      }
    this.productoService.getProductos(page).pipe(
      tap(response => {
          console.log('ProductoComponent: tap 3');
          (response.content as Producto[]).forEach( producto => {
            console.log(producto.nombre);
          });
      })
      ).subscribe(
      response => {
        this.productos = response.content as Producto[]
        this.paginador = response;
      });
    });
  }

  delete(producto: Producto): void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar el producto ${producto.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.productoService.delete(producto.id).subscribe(
          response => {
            this.productos = this.productos.filter(prod => prod !==producto)
            swalWithBootstrapButtons.fire(
              'Producto eliminado!',
              `Producto ${producto.nombre} eliminado con éxito`,
              'success'
            )
          }
        )
      }
    });
  }
}
