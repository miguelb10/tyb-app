import { Component, OnInit } from '@angular/core';
import { Factura } from '../factura';
import { FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { Producto } from 'src/app/productos/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaService } from '../factura.service';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import swal from 'sweetalert2';
import { ItemFactura } from '../item-factura';
import { Cliente } from 'src/app/clientes/cliente';

@Component({
  selector: 'app-form-factura',
  templateUrl: './form-factura.component.html',
  styleUrls: ['./form-factura.component.css']
})
export class FormFacturaComponent implements OnInit {

  titulo: string = 'Nueva factura';
  factura: Factura = new Factura();
  cliente: Cliente = new Cliente();
  autocompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;
  clientesFiltrados: Observable<Cliente[]>;

  constructor(private clienteService: ClienteService,
    private facturaService: FacturaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.clientesFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string'? value: value.nombre),
        flatMap(value => value ? this._filter(value): [])
      );
    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string'? value: value.nombre),
        flatMap(value => value ? this._filter(value): [])
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined{
    return producto? producto.nombre : undefined;
  }
  seleccionarProducto(event: MatAutocompleteSelectedEvent): void{
    let producto = event.option.value as Producto;
    console.log(producto);

    if(this.existeItem(producto.id)){
      this.incrementarCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  seleccionarCliente(event: MatAutocompleteSelectedEvent): void{
    let cliente = event.option.value as Cliente;
    console.log(cliente);

    if(this.existeItem(cliente.id)){
      this.incrementarCantidad(cliente.id);
    } else {
      let nuevoItem = new Cliente();
      nuevoItem = cliente;
      this.cliente = nuevoItem;
    }

    this.autocompleteControl.setValue(cliente.nombre);
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any): void{
    let cantidad: number = event.target.value as number;
    if(cantidad == 0){
      this.eliminarItemFactura(id);
    }
    this.factura.items = this.factura.items.map((item: ItemFactura) =>{
      if(id === item.producto.id){
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean{
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if(id === item.producto.id){
        existe = true;
      }
    });
    return existe;
  }

  incrementarCantidad(id: number): void{
    this.factura.items = this.factura.items.map((item: ItemFactura) =>{
      if(id === item.producto.id){
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number): void{
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id);
  }

  create(facturaForm): void{
    console.log(this.factura);

    if(this.factura.items.length == 0){
      this.autocompleteControl.setErrors({'invalid': true});
    }

    if(facturaForm.form.valid && this.factura.items.length > 0){
      this.facturaService.create(this.factura).subscribe(factura => {
        swal.fire(this.titulo, `Factura ${factura.descripcion} creada con éxito!`, 'success');
        this.router.navigate(['/facturas', factura.id]);
      });
    }
  }
}
