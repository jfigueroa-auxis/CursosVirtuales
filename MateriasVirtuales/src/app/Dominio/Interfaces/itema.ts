import { ILeccion } from './ileccion';
import { IEvaluacion } from './ievaluacion';

export interface ITema {
    Id: number;
    Nombre: string;
    Lecciones: ILeccion[];
    Parcial: IEvaluacion;
}
