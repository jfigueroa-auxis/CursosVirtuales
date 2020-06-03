import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../Servicios/estudiante.service';
import { IMateriaInscrita } from '../../../Dominio/Interfaces/imateria-inscrita';

@Component({
  selector: 'app-materias-aprobadas',
  templateUrl: './materias-aprobadas.component.html',
  styleUrls: ['./materias-aprobadas.component.css']
})
export class MateriasAprobadasComponent implements OnInit {

  Materias: IMateriaInscrita[];

  constructor(private estudianteSvc: EstudianteService) { }

  ngOnInit() {
    this.estudianteSvc.EstudianteActual.subscribe(estudiante => this.Materias = estudiante ? estudiante.MateriasInscritas.filter(m => m.Aprobada) : [])
  }

}
