import { ITema } from './itema';

export interface IMateria {
    Id: string;
    ProfesorId: string;
    Nombre: string;
    Descripcion: string;
    Publicada: boolean;
    Suspendida: boolean;
    Costo: number;
    VideoId: string;
    Temas: ITema[];
    LimiteDias: number;
}
