import { IEvaluacion } from '../Interfaces/ievaluacion';
import { Pregunta } from './pregunta';

export class Evaluacion {
 
  constructor(private ievaluacion: IEvaluacion) { }

  validar(): string[] {
    const errores: string[] = [];

    if (this.ievaluacion.Preguntas === null || this.ievaluacion.Preguntas.length < 1)
      errores.push("la evaluacion no tiene preguntas");
    else {
      const erroresPreguntas = this.ievaluacion.Preguntas.reduce((err, preg) => {
        err.push(...new Pregunta(preg).validar());
        return err;
      }, [])
      errores.push(...erroresPreguntas);
    }

    return errores;
  }

  static nuevaInterface(): IEvaluacion {
    const i = {} as IEvaluacion;
    i.Preguntas = [];
    return i;
  }

  static sinRespuestasCorrectas(evaluacion: IEvaluacion): IEvaluacion {
    const preguntas = evaluacion.Preguntas.map(pregunta => {
      const copiaPregunta = { ...pregunta };
      const respuestas = copiaPregunta.Respuestas.map(respuesta => {
        const copiaRespuesta = { ...respuesta };
        copiaRespuesta.EsCorrecta = false
        return copiaRespuesta;
      });
      copiaPregunta.Respuestas = respuestas;
      return copiaPregunta;
    })
    const eva = this.nuevaInterface();
    eva.Preguntas.push(...preguntas);
    return eva;
  }

  static calificar(pruebaConRespuestas: IEvaluacion, pruebaEstudiante: IEvaluacion): boolean {
    let aprueba = true;

    const respuestasCorrectas = pruebaConRespuestas.Preguntas.reduce((acum, preg) => {
      acum.push(...preg.Respuestas);
      return acum;
    }, [])

    const respuestasEstudiante = pruebaEstudiante.Preguntas.reduce((acum, preg) => {
      acum.push(...preg.Respuestas);
      return acum;
    }, [])

    for (let i = 0; i < respuestasCorrectas.length; i++) {
      aprueba = respuestasCorrectas[i].EsCorrecta === respuestasEstudiante[i].EsCorrecta;
      if (!aprueba)
        i = 10000;
    }
    return aprueba;
  }
}
