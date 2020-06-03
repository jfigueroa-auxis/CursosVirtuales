import { IPregunta } from '../Interfaces/ipregunta';
import { error } from 'util';
import { Respuesta } from './respuesta';

export class Pregunta {

  static nuevaInterface(): IPregunta {
    const i = {} as IPregunta;
    i.Texto = "";
    i.Respuestas = [];
    for (let j = 0; j < 4; j++)
      i.Respuestas.push({ Texto: "", EsCorrecta: false })
    return i;
  }

  constructor(private ipregunta: IPregunta) { }

  validar(): string[] {
    const errores: string[] = [];

    if (this.ipregunta.Texto === null || this.ipregunta.Texto === "")
      errores.push("la pregunta no tiene texto");

    if (this.ipregunta.Respuestas === null || this.ipregunta.Respuestas.length < 1)
      errores.push("la pregunta no contiene respuestas");
    else {
      const respuestaCorrectas = this.ipregunta.Respuestas.reduce((conteo, respuesta) => conteo += respuesta.EsCorrecta ? 1 : 0, 0);
      if (respuestaCorrectas === 0)
        errores.push("la pregunta no tiene al menos una respuesta marcada como correcta");

      const err = this.ipregunta.Respuestas.reduce((errors, respuesta) => {
        errors.push(...new Respuesta(respuesta).validar());
        return errors;
      }, []);

      errores.push(...err);
    }

    return errores;
  }
}

