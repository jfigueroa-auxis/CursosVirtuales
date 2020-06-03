import { ITema } from '../Interfaces/itema';
import { Evaluacion } from './evaluacion';
import { Leccion } from './leccion';

export class Tema {

  constructor(private itema: ITema) { }

  static nuevaInterface(): ITema {
    const i = {} as ITema;
    i.Id = 0;
    i.Lecciones = [];
    i.Nombre = "";
    return i;
  }

  validar(): string[] {
    const errores: string[] = [];

    if (this.itema.Nombre === null || this.itema.Nombre === "")
      errores.push("El tema numero " + this.itema.Id + " no tiene nombre");

    if (this.itema.Parcial === null)
      errores.push("El tema numero " + this.itema.Id + " no tiene parcial");
    else {
      errores.push(...new Evaluacion(this.itema.Parcial).validar())
    }

    if (this.itema.Lecciones === null || this.itema.Lecciones.length < 1)
      errores.push("El tema no tiene lecciones")
    else {
      const erroresLeccion = this.itema.Lecciones.reduce((errors, leccion) => {
        errors.push(...new Leccion(leccion).validar())
        return errors;
      }, [])
      errores.push(...erroresLeccion);
    }

    return errores;
  }
}
