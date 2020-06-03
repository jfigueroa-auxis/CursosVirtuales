import { Tema } from './tema';
import { IMateria } from '../Interfaces/imateria';
import { IParametro } from '../Interfaces/iparametro';
import { Leccion } from './leccion';
import { Pregunta } from './pregunta';
import { Evaluacion } from './evaluacion';
import { ILeccion } from '../Interfaces/ileccion';
import { IPregunta } from '../Interfaces/ipregunta';

export interface Actividad {
  Descriptor: string;
  Nombre?: string;
  Datos?: any;
}

export class Materia {
  imateria: IMateria;

  constructor(imateria: IMateria) {
    this.imateria = imateria;
  }

  static Interface(): IMateria {
    const i = {} as IMateria;
    i.Id = null;
    i.Costo = 0;
    i.Descripcion = "";
    i.LimiteDias = 0;
    i.Nombre = "";
    i.Publicada = false;
    i.Suspendida = false;
    i.Temas = [];
    return i;
  }

  ValidarParaPublicar(): string[] {
    const errores: string[] = [];

    if (this.imateria.Nombre === null || this.imateria.Nombre === "")
      errores.push("La materia no tiene un nombre");

    if (this.imateria.Descripcion === null || this.imateria.Descripcion === "")
      errores.push("La materia no tiene una descripcion");

    if (this.imateria.LimiteDias === null || this.imateria.LimiteDias < 1)
      errores.push("La materia no tiene un limite en dias");

    if (this.imateria.Costo === null || this.imateria.Costo < 0)
      errores.push("El costo no puede ser menor a cero");

    if (this.imateria.VideoId === null || this.imateria.VideoId === "")
      errores.push("La materia no tiene video introductorio");

    if (this.imateria.Temas === null || this.imateria.Temas.length < 1)
      errores.push("La materia no tiene temas");
    else {
      const erroresTemas = this.imateria.Temas.reduce((errores, tema) => {
        errores.push(...new Tema(tema).validar());
        return errores;
      }, [])
      errores.push(...erroresTemas);
    }

    return errores;
  }

  static construirMateria(parametros: IParametro): IMateria {
    const nuevaMateria = this.Interface();

    nuevaMateria.Nombre = "Nuevo Curso";

    for (let i = 0; i < parametros.TemasPorMateria; i++) {
      const tema = Tema.nuevaInterface();
      tema.Nombre = "Tema " + (i + 1);
      tema.Id = i + 1;
      tema.Lecciones = this.crearLecciones(parametros);
      tema.Parcial = Evaluacion.nuevaInterface();
      tema.Parcial.Preguntas =  this.crearPreguntasParcial(parametros);
      nuevaMateria.Temas.push(tema);
    }
    return nuevaMateria;
  }

  private static crearPreguntasQuiz(parametros: IParametro): IPregunta[] {
    const preguntasQuiz = [];
    for (let i = 0; i < parametros.PreguntasPorQuiz; i++) {
      preguntasQuiz.push(Pregunta.nuevaInterface());
    }
    return preguntasQuiz;
  }

  private static crearPreguntasParcial(parametros: IParametro): IPregunta[] {
    const preguntasParcial = [];
    for (let i = 0; i < parametros.PreguntasPorParcial; i++) {
      preguntasParcial.push(Pregunta.nuevaInterface());
    }
    return preguntasParcial;
  }


  private static crearLecciones(parametros: IParametro): ILeccion[] {
    const lecciones = [];
    for (let i = 0; i < parametros.LeccionesPorTema; i++) {
      const leccion = Leccion.nuevaInterace();
      leccion.Titulo = "Leccion " + (i + 1);
      leccion.Id = i + 1;
      leccion.Quiz = Evaluacion.nuevaInterface();
      leccion.Quiz.Preguntas = this.crearPreguntasQuiz(parametros);
      lecciones.push(leccion);
    }
    return lecciones;
  }

  static actividades(materia: IMateria): Actividad[] {
    const actividades = [];

    materia.Temas.forEach(tema => {
      actividades.push({ Descriptor: 'tema', Nombre: tema.Nombre } as Actividad)
      tema.Lecciones.forEach(leccion => {
        actividades.push({ Descriptor: 'leccion',  Nombre: leccion.Titulo, Datos: leccion } as Actividad)
        actividades.push({ Descriptor: 'prueba leccion', Nombre: 'Prueba de leccion', Datos: leccion.Quiz } as Actividad)
      })
      actividades.push({ Descriptor: 'prueba tema', Nombre: 'Prueba del tema', Datos: tema.Parcial } as Actividad)
    })

    return actividades;
  }
}
