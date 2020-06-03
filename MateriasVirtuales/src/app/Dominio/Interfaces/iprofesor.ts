import { IParametro } from './iparametro';

export interface IProfesor {
  Id: string;
  Nombres: string;
  Apellidos: string;
  Email: string;
  Activo: boolean;
  Parametros: IParametro;
}
