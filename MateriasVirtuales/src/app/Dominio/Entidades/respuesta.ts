import { IRespuesta } from '../Interfaces/irespuesta';

export class Respuesta {

  constructor(private irespuesta: IRespuesta) { }

  validar(): string[] {
    const errores: string[] = [];

    if (this.irespuesta.Texto === null || this.irespuesta.Texto === "")
      errores.push("la respuesta no puede estar vacia")

    return errores;
  }
}
