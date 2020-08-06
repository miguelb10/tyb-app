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
}
