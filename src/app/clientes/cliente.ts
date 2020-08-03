import { Factura } from '../facturas/factura';

export class Cliente {
  id: number;
  nombre: string;
  ruc: string;
  direccionFiscal: string;
	estado: boolean;
	deudor: boolean;
  email: string;
  fechaCreacion: string;
  facturas: Factura[] = [];
}
