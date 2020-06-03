import { IEvaluacion } from './ievaluacion';
import { IDocumentoAdjunto } from './idocumento-adjunto';

export interface ILeccion {
    Id: number;
    Titulo: string;
    Objetivos: string;
    Descripcion: string;
    VideoId: string;
    DocumentosAdjuntos: IDocumentoAdjunto[];
    Quiz: IEvaluacion;
}
