import { ILeccion } from '../Interfaces/ileccion';
import { IEvaluacion } from '../Interfaces/ievaluacion';
import { Evaluacion } from './evaluacion';

export class Leccion {

  constructor(private ileccion: ILeccion) { }

  static nuevaInterace(): ILeccion {
    const i = {} as ILeccion;
    i.Titulo = "";
    i.Descripcion = "";
    i.Objetivos = "";
    i.DocumentosAdjuntos = [];
    i.Id = 0;
    i.Quiz = {} as IEvaluacion;
    return i;
  }

  validar(): string[] {
    const errores: string[] = [];

    if (this.ileccion.Titulo === null || this.ileccion.Titulo === "")
      errores.push("La leccion " + this.ileccion.Id + " no tiene un titulo")

    if (this.ileccion.Descripcion === null || this.ileccion.Descripcion === "")
      errores.push("La leccion " + this.ileccion.Id + " no tiene una descripcion")

    if (this.ileccion.Objetivos === null || this.ileccion.Objetivos === "")
      errores.push("La leccion " + this.ileccion.Id + " no tiene objetivos")

    if (this.ileccion.VideoId === null || this.ileccion.VideoId === "")
      errores.push("La leccion " + this.ileccion.Id + " no video")

    if (this.ileccion.Quiz === null)
      errores.push("La leccion numero " + this.ileccion.Id + " no tiene quiz");
    else {
      errores.push(...new Evaluacion(this.ileccion.Quiz).validar())
    }


    return errores;
  }
}
