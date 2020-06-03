import { Component, OnInit, Input } from '@angular/core';
import { IEvaluacion } from '../../../Dominio/Interfaces/ievaluacion';

@Component({
  selector: 'app-editar-evaluacion',
  templateUrl: './editar-evaluacion.component.html',
  styleUrls: ['./editar-evaluacion.component.css']
})
export class EditarEvaluacionComponent implements OnInit {

  @Input() Evaluacion: IEvaluacion = null;

  constructor() { }

  ngOnInit() {
  }

}
