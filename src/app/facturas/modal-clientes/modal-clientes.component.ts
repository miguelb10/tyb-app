import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/clientes/cliente';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap, isEmpty } from 'rxjs/operators';
import { Factura } from '../factura';
import { FacturaService } from '../factura.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.component.html',
  styleUrls: ['./modal-clientes.component.css']
})
export class ModalClientesComponent implements OnInit {

  titulo: string = 'Seleccionar cliente';
  factura: Factura = new Factura();
  cliente: Cliente = new Cliente();
  autocompleteControlCliente = new FormControl();
  clientesFiltrados: Observable<Cliente[]>;

  constructor(public modalService: ModalService,
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.clientesFiltrados = this.autocompleteControlCliente.valueChanges
      .pipe(
        map(value => typeof value === 'string'? value: value.nombre),
        flatMap(value => value ? this._filterCliente(value): [])
      );
  }

  private _filterCliente(value: string): Observable<Cliente[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarClientes(filterValue);
  }
  mostrarNombreCliente(cliente?: Cliente): string | undefined{
    return cliente? cliente.nombre : undefined;
  }
  seleccionarCliente(eventCliente: MatAutocompleteSelectedEvent): void{
    let cliente = eventCliente.option.value as Cliente;
    console.log(cliente);

    this.cliente = cliente;

    this.autocompleteControlCliente.setValue(cliente.nombre);
    eventCliente.option.focus();
    eventCliente.option.deselect();
  }

  continue(clienteForm): void{
    console.log(this.cliente);

    if(this.cliente.id == null){
      this.autocompleteControlCliente.setErrors({'invalid': true});
    }

    if(clienteForm.form.valid && this.cliente.id != null){
      this.router.navigate(['/facturas/form/'+this.cliente.id]);
    }
  }

  cerraModal(){
    this.modalService.cerrarModal();
    this.cliente = new Cliente();
  }
}
