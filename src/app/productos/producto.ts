import { Color } from '../colors/color';

export class Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
	stock: number;
  color: Color;
	estado: boolean;
  fechaCreacion: string;
}
