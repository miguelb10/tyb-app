import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators'
import { URL_BACKEND } from '../config/config';
import { ClienteService } from './cliente.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  urlBackend: string = URL_BACKEND;

  constructor(private clienteService: ClienteService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let page = 0;
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page');
      if(!page){
        page = 0;
      }
    this.clienteService.getClientes(page).pipe(
      tap(response => {
          console.log('ClienteComponent: tap 3');
          (response.content as Cliente[]).forEach( cliente => {
            console.log(cliente.nombre);
          });
      })
      ).subscribe(
      response => {
        this.clientes = response.content as Cliente[]
        this.paginador = response;
      });
    });
  }

}
