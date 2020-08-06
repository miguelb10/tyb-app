import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Color } from 'src/app/colors/color';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  public producto: Producto = new Producto();
  public colors: Color[];
  public titulo: string = "crear Producto"
  public errores: string[];

  constructor(private productoService: ProductoService,
    private router: Router,
    private activatedRoute : ActivatedRoute) { }

    ngOnInit(): void {
      this.cargarProducto();
      this.productoService.getColors().subscribe(colors => this.colors = colors);
    }

    cargarProducto(): void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        if(id){
          this.productoService.getProducto(id).subscribe( (producto) => this.producto = producto)
        }
      })
    }

    create(): void{
      console.log(this.producto);
      this.productoService.create(this.producto)
        .subscribe(producto => {
          this.router.navigate(['/productos'])
          swal.fire('Nuevo producto', `El producto ${producto.nombre} ha sido creado con éxito`,'success')
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
    }

    update(): void{
      console.log(this.producto);
      this.productoService.update(this.producto)
      .subscribe(json => {
        this.router.navigate(['/productos'])
        swal.fire('Producto actualizado', `${json.mensaje}: ${json.producto.nombre}`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      )
    }

    compararColor(o1: Color, o2: Color): boolean{
      if(o1 === undefined && o2 === undefined){
        return true;
      }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id === o2.id;
    }
}
