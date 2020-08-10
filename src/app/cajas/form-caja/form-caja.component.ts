import { Component, OnInit } from '@angular/core';
import { Caja } from '../caja';
import { CajaService } from '../caja.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-caja',
  templateUrl: './form-caja.component.html',
  styleUrls: ['./form-caja.component.css']
})
export class FormCajaComponent implements OnInit {

  public caja: Caja = new Caja();
  public tipos: string[] = ["Entrada", "Salida"];
  public titulo: string = "crear caja"
  public errores: string[];

  constructor(private cajaService: CajaService,
    private router: Router,
    private activatedRoute : ActivatedRoute) { }

    ngOnInit(): void {
      this.cargarCaja();
    }

    cargarCaja(): void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id'];
        if(id){
          this.cajaService.getCaja(id).subscribe( (caja) => this.caja = caja)
        }
      })
    }

    create(): void{
      console.log(this.caja);
      this.cajaService.create(this.caja)
        .subscribe(caja => {
          this.router.navigate(['/cajas'])
          swal.fire('Nuevo registro', `El registro ${caja.motivo} ha sido creado con éxito`,'success')
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
    }

    update(): void{
      console.log(this.caja);
      this.cajaService.update(this.caja)
      .subscribe(json => {
        this.router.navigate(['/cajas'])
        swal.fire('Caja actualizado', `${json.mensaje}: ${json.caja.motivo}`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
      )
    }

}
