import { IMateriaInscrita } from './imateria-inscrita';

export interface IEstudiante {
  Id: string;
  Nombres: string;
  Apellidos: string;
  Email: string;
  MateriasInscritas: IMateriaInscrita[];
  Activo: boolean;
}
