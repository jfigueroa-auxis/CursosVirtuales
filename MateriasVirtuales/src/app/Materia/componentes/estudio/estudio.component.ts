import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriaService } from '../../../Servicios/materia.service';
import { Materia, Actividad } from '../../../Dominio/Entidades/materia';
import { LeccionComponent } from '../leccion/leccion.component';
import { EvaluacionComponent } from '../evaluacion/evaluacion.component';
import { HostDinamicoDirective } from '../../../Infraestructura/directivas/host-dinamico.directive';
import { Tarea } from '../../interfaces/tarea';
import { LinkedList, INode } from '../../../Infraestructura/helpers/linked-list';
import { EstudianteService } from '../../../Servicios/estudiante.service';
import { IMateriaInscrita } from '../../../Dominio/Interfaces/imateria-inscrita';
import { TemaMap } from '../../interfaces/tema-map';
import { CursoCompletadoComponent } from '../curso-completado/curso-completado.component';
import { filter, tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-estudio',
  templateUrl: './estudio.component.html',
  styleUrls: ['./estudio.component.css']
})
export class EstudioComponent implements OnInit {

  RutaDeAprendizaje = new LinkedList<Tarea>();
  MateriaId = "";
  Temas: TemaMap[] = [];
  MateriaInscrita: IMateriaInscrita;

  private tareaActual: INode<Tarea>;

  get NumActividadActual(): number {
    if (this.tareaActual)
      return this.tareaActual.index + 1;
    else
      return -1;
  }

  get UltimaActividad(): number {
    if (this.MateriaInscrita)
      return this.MateriaInscrita.UltimaActividad;
    else
      return 1;
  }

  @ViewChild(HostDinamicoDirective, { static: true })
  contenedor: HostDinamicoDirective;

  constructor(private route: ActivatedRoute,
    private materiaSvc: MateriaService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private estudianteSvc: EstudianteService
  ) { }

  ngOnInit() {
    const materiaId = this.route.snapshot.paramMap.get('id');
    this.MateriaId = materiaId;
    const actividad = this.route.snapshot.paramMap.get('actividad');
    this.estudianteSvc.EstudianteActual.pipe(
      filter(stu => stu !== null),
      tap(estudiante => this.MateriaInscrita = estudiante.MateriasInscritas.find(mat => mat.MateriaId === materiaId)),
      this.tapOnce(() => this.crearRuta(materiaId, parseInt(actividad)))
    ).subscribe()
  }

  crearRuta(materiaId: string, actividadInicial: number) {
    this.materiaSvc.CargarMateria(materiaId).subscribe(materia => {
      this.materiaSvc.setMateriaActual(materia);
      const actividades = Materia.actividades(materia);
      this.crearMapa(actividades);
      const elems = actividades.filter(act => act.Descriptor !== 'tema').map(actividad => {
        const tarea = {} as Tarea;
        tarea.data = actividad.Datos;
        tarea.descriptor = actividad.Descriptor;

        if (actividad.Descriptor === 'leccion')
          tarea.componente = LeccionComponent;
        else if (actividad.Descriptor.startsWith('prueba'))
          tarea.componente = EvaluacionComponent;
        else {
          /**/
        }

        return tarea;
      })

      this.RutaDeAprendizaje.fromArray(elems);
      this.RutaDeAprendizaje.append({ descriptor: 'completado', componente: CursoCompletadoComponent })
      const idxActividad = actividadInicial <= this.MateriaInscrita.UltimaActividad ? actividadInicial : this.MateriaInscrita.UltimaActividad;
      this.tareaActual = this.RutaDeAprendizaje.elementAt(idxActividad === 0 ? 0 : idxActividad - 1);
      this.gestionarAvance();
    })
  }

  gestionarAvance(): void {
    if (!this.tareaActual.next) {
      this.MateriaInscrita.Aprobada = true;
      this.estudianteSvc.Actualizar().subscribe();
    }
    else {
      if (this.tareaActual.index > this.MateriaInscrita.UltimaActividad - 1) {
        this.MateriaInscrita.UltimaActividad = this.tareaActual.index + 1;
        this.estudianteSvc.Actualizar().subscribe();
      }
    }
    this.cargarComponente();
  }

  cargarComponente() {
    const tarea = this.tareaActual.value;

    const viewContainerRef = this.contenedor.viewContainerRef;
    viewContainerRef.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(tarea.componente);
    const componentRef = viewContainerRef.createComponent(componentFactory);

    if (tarea.descriptor === 'leccion') {
      const comp = (componentRef.instance as LeccionComponent);
      comp.Leccion = tarea.data;
      comp.Avanzar.subscribe(sentido => this.avanzar(sentido));
      comp.MostrarAnterior = this.tareaActual.previous !== null;
      comp.MostrarSiguiente = this.tareaActual.next !== null;
    }
    else if (tarea.descriptor.startsWith('prueba')) {
      const comp = (componentRef.instance as EvaluacionComponent);
      comp.ModoEstudiante = true;
      comp.Evaluacion = tarea.data;
      comp.Titulo = tarea.descriptor.endsWith('leccion') ? 'Prueba de lección' : 'Prueba de tema'
      comp.Avanzar.subscribe(sentido => this.avanzar(sentido));
      comp.Aprobada = this.tareaActual.index + 1 < this.MateriaInscrita.UltimaActividad;
      comp.MostrarAnterior = this.tareaActual.previous !== null;
      comp.MostrarSiguiente = this.tareaActual.next !== null;
    }
    else {
      /* curso completado */
    }
  }

  avanzar(sentido: string): void {
    if (sentido === "adelante")
      this.tareaActual = this.tareaActual.next;
    else
      this.tareaActual = this.tareaActual.previous;
    this.gestionarAvance();
  }

  crearMapa(actividades: Actividad[]): void {
    let actividadActual: TemaMap;
    let cont = 1;

    for (let i = 0; i < actividades.length; i++) {
      if (actividades[i].Descriptor === 'tema') {
        actividadActual = {} as TemaMap;
        actividadActual.Nombre = actividades[i].Nombre;
        actividadActual.Actividades = [];
        this.Temas.push(actividadActual);
      }
      else {
        actividadActual.Actividades.push({ Nombre: actividades[i].Nombre, Numero: cont++ })
      }
    }
  }

  irAEstaActividad(actividadNumero: number): void {
    this.tareaActual = this.RutaDeAprendizaje.elementAt(actividadNumero - 1);
    this.gestionarAvance();
  }

  tapOnce<T>(fn: (value) => void) {
    return function (source: Observable<T>) {
      source
        .pipe(
          take(1),
          tap(value => fn(value))
        )
        .subscribe();

      return source;
    };
  }
}
