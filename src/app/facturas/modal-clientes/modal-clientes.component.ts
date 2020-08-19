import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.component.html',
  styleUrls: ['./modal-clientes.component.css']
})
export class ModalClientesComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  cerraModal(){
    this.modalService.cerrarModal();
  }
}
