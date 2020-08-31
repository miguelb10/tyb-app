import { Producto } from '../productos/producto';

export class ItemFactura {
  producto: Producto;
  cantidad: number = 1;
  importe: number;

  eliminarDecimales(valor: number): number {
    return Number(valor.toFixed(4));
  }
  public calcularImporte(): number {
    var calculo;
    calculo = this.cantidad * this.producto.precio;
    calculo = this.eliminarDecimales(calculo);
    return calculo;
  }
}
