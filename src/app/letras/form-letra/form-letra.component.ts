import { Component, OnInit } from '@angular/core';
import { Letra } from '../letra';
import { LetraService } from '../letra.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-letra',
  templateUrl: './form-letra.component.html',
  styleUrls: ['./form-letra.component.css']
})
export class FormLetraComponent implements OnInit {

  public letra: Letra = new Letra();
  public titulo: string = "crear letra"
  public errores: string[];

  constructor(private letraService: LetraService,
    private router: Router,
    private activatedRoute : ActivatedRoute) { }

    ngOnInit(): void {
      this.cargarLetra();
    }

    cargarLetra(): void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        if(id){
          this.letraService.getLetra(id).subscribe( (letra) => this.letra = letra)
        }
      })
    }

    create(): void{
      console.log(this.letra);
      this.letraService.create(this.letra)
        .subscribe(letra => {
          this.router.navigate(['/letras'])
          swal.fire('Nuevo registro', `El registro ${letra.nombre} ha sido creado con éxito`,'success')
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
    }

    update(): void{
      console.log(this.letra);
      this.letraService.update(this.letra)
      .subscribe(json => {
        this.router.navigate(['/letras'])
        swal.fire('Letra actualizado', `${json.mensaje}: ${json.letra.nombre}`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      )
    }
}
