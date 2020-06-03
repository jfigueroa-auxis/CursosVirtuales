import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IEvaluacion } from '../../../Dominio/Interfaces/ievaluacion';
import { Evaluacion } from '../../../Dominio/Entidades/evaluacion';
import { AlertasComponent } from '../../../Infraestructura/componentes/alertas/alertas.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

  private _EvaluacionOriginal: IEvaluacion = null

  Prueba: IEvaluacion = null;

  @ViewChild('alertas', { static: true })
  Alertas: AlertasComponent;

  @Input()
  set Evaluacion(value: IEvaluacion) {
    this._EvaluacionOriginal = value;
    if (this.ModoEstudiante)
      this.Prueba = Evaluacion.sinRespuestasCorrectas(value);
    else
      this.Prueba = value;
  }

  @Input()
  ModoEstudiante = false;

  @Input()
  Aprobada = false;

  @Input()
  MostrarSiguiente = false;

  @Input()
  MostrarAnterior = false;

  @Input()
  Titulo = "";

  @Output()
  Avanzar = new EventEmitter<string>();

  get PuedeContinuar(): boolean {
    if (!this.ModoEstudiante)
      return this.MostrarSiguiente
    else {
      return this.Aprobada && this.MostrarSiguiente;
    }
  }

  constructor() { }

  ngOnInit() {
  }

  calificar(): void {
    const aprueba = Evaluacion.calificar(this._EvaluacionOriginal, this.Prueba);
    if (aprueba) {
      this.Alertas.Exito("Has superado la prueba, puedes continuar a la siguiente actividad");
      this.Aprobada = true;
    }
    else {
      this.Alertas.Error("Has reprobado, estudia un poco más e intentalo de nuevo.")
    }
  }

  AnteriorActividad(): void {
    this.Avanzar.emit('atras');
  }

  SiguienteActividad(): void {
    this.Avanzar.emit('adelante');
  }

}
