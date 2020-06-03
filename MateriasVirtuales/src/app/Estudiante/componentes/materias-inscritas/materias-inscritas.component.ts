import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../Servicios/estudiante.service';
import { IMateriaInscrita } from '../../../Dominio/Interfaces/imateria-inscrita';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-materias-inscritas',
  templateUrl: './materias-inscritas.component.html',
  styleUrls: ['./materias-inscritas.component.css']
})
export class MateriasInscritasComponent implements OnInit {

  Materias: IMateriaInscrita[];
  ModoConsulta = false;

  constructor(private estudianteSvc: EstudianteService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('estudianteId')) {
      this.ModoConsulta = true;
      const id = this.route.snapshot.paramMap.get('estudianteId');
      this.estudianteSvc.Cargar(id).subscribe(estudiante => this.Materias = estudiante ? estudiante.MateriasInscritas : [])
    }
    else
      this.estudianteSvc.EstudianteActual.subscribe(estudiante => this.Materias = estudiante ? estudiante.MateriasInscritas.filter(m => !m.Aprobada) : [])
  }

}
