import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriaService } from '../../../Servicios/materia.service';
import { Materia, Actividad } from '../../../Dominio/Entidades/materia';
import { LeccionComponent } from '../leccion/leccion.component';
import { EvaluacionComponent } from '../evaluacion/evaluacion.component';
import { HostDinamicoDirective } from '../../../Infraestructura/directivas/host-dinamico.directive';
import { Tarea } from '../../interfaces/tarea';
import { LinkedList, INode } from '../../../Infraestructura/helpers/linked-list';
import { TemaMap } from '../../interfaces/tema-map';

@Component({
  selector: 'app-recorrido',
  templateUrl: './recorrido.component.html',
  styleUrls: ['./recorrido.component.css']
})
export class RecorridoComponent implements OnInit {

  RutaDeAprendizaje = new LinkedList<Tarea>();
  MateriaId = "";
  Temas: TemaMap[] = [];

  get NumActividadActual(): number {
    if (this.tareaActual)
      return this.tareaActual.index + 1;
    else
      return -1;
  }

  private tareaActual: INode<Tarea>;

  @ViewChild(HostDinamicoDirective, { static: true })
  contenedor: HostDinamicoDirective;

  constructor(private route: ActivatedRoute, private materiaSvc: MateriaService, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const materiaId = this.route.snapshot.paramMap.get('id');
    this.MateriaId = materiaId;
    this.crearRuta(materiaId);
  }

  crearRuta(materiaId: string) {
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
        else
          tarea.componente = null;

        return tarea;
      })

      this.RutaDeAprendizaje.fromArray(elems);

      this.tareaActual = this.RutaDeAprendizaje.getHead();
      this.cargarComponente();
    })
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
    else {
      const comp = (componentRef.instance as EvaluacionComponent);
      comp.Evaluacion = tarea.data;
      comp.Titulo = tarea.descriptor.endsWith('leccion') ? 'Prueba de lección' : 'Prueba de tema'
      comp.Avanzar.subscribe(sentido => this.avanzar(sentido));
      comp.MostrarAnterior = this.tareaActual.previous !== null;
      comp.MostrarSiguiente = this.tareaActual.next !== null;
    }
  }

  avanzar(sentido: string): void {
    if (sentido === "adelante") {
      this.tareaActual = this.tareaActual.next;
      this.cargarComponente();
    } else {
      this.tareaActual = this.tareaActual.previous;
      this.cargarComponente();
    }
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
    this.cargarComponente();
  }
}
