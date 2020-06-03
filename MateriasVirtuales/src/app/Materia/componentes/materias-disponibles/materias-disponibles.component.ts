import { Component, OnInit } from '@angular/core';
import { MateriaService } from '../../../Servicios/materia.service';
import { IMateria } from '../../../Dominio/Interfaces/imateria';
import { EstudianteService } from '../../../Servicios/estudiante.service';

@Component({
  selector: 'app-materias-disponibles',
  templateUrl: './materias-disponibles.component.html',
  styleUrls: ['./materias-disponibles.component.css']
})
export class MateriasDisponiblesComponent implements OnInit {

  Materias: IMateria[] = [];

  constructor(private materiaSvc: MateriaService, private estudianteSvc: EstudianteService) { }

  ngOnInit() {
    this.materiaSvc.CargarMateriasDisponibles().subscribe(materias => {
      this.estudianteSvc.EstudianteActual.subscribe(est => {
        if (est)
          this.Materias = materias.filter(materia => !est.MateriasInscritas.some(mat => mat.MateriaId === materia.Id))
        else
          this.Materias = materias
      })
    });
  }

}
