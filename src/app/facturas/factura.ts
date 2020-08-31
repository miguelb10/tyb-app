import { ItemFactura } from './item-factura';
import { Cliente } from '../clientes/cliente';
import { Serie } from './serie';

export class Factura {
  id: number;
  tipoOperacion: string;
  estado: string;
  descripcion: string;
  observacion: string;
  tipoMoneda: string;
  retencion: number;
  correlativo: number;
  subTotal: number;
  anticipos: number;
  descuentos: number;
  valorVenta: number;
  isc: number;
  igv: number;
  icbper: number;
  otrosCargos: number;
  otrosTributos: number;
  importeTotal: number;
  fechaEmision: string;
  horaEmision: string;
  fechaVencimiento: string;
  items: Array<ItemFactura> = [];
  cliente: Cliente;
  serie: Serie[];
  eliminarDecimales(valor: number): number {
    return Number(valor.toFixed(4));
  }
  calcularSubTotal(): number {
    this.subTotal = 0;
    this.items.forEach((item: ItemFactura) => {
      this.subTotal += item.calcularImporte();
    });
    this.subTotal = this.eliminarDecimales(this.subTotal);
    return this.subTotal;
  }
  calcularValorVenta(): number {
    this.valorVenta = 0;
    if (isNaN(this.descuentos)) {
      this.descuentos = 0;
    }
    if (isNaN(this.anticipos)) {
      this.anticipos = 0;
    }
    this.valorVenta = this.subTotal - this.anticipos - this.descuentos;
    this.valorVenta = this.eliminarDecimales(this.valorVenta);
    return this.valorVenta;
  }
  calcularIGV(): number {
    this.igv = 0;
    this.igv = (this.valorVenta * 18) / 100;
    this.igv = this.eliminarDecimales(this.igv);
    return this.igv;
  }
  calcularImporteTotal(): number {
    this.importeTotal = 0;
    if (isNaN(this.otrosCargos)) {
      this.otrosCargos = 0;
    }
    if (isNaN(this.otrosTributos)) {
      this.otrosTributos = 0;
    }
    this.importeTotal = this.valorVenta + this.igv + this.otrosCargos + this.otrosTributos;
    this.importeTotal = this.eliminarDecimales(this.importeTotal);
    return this.importeTotal;
  }
}
