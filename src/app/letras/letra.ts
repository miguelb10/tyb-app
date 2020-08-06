import { Factura } from '../facturas/factura';

export class Letra {
    id: number;
    nombre: string;
    descripcion: string;
    total: number;
    adelanto: number;
    porcentaje: number;
    estado: string;
    factura: Factura[];
    fechaCreacion: string;
    fechaVencimiento: string;
}
