import { IParametro } from '../Interfaces/iparametro';

export class Parametros {

  static generarParametros(): IParametro {
    const params = {} as IParametro;
    params.LeccionesPorTema = 2;
    params.PreguntasPorParcial = 2;
    params.PreguntasPorQuiz = 2;
    params.TemasPorMateria = 2;

    return params;
  }

}
