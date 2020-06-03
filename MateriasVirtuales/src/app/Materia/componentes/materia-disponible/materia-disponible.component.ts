import { Component, OnInit, Input } from '@angular/core';
import { IMateria } from '../../../Dominio/Interfaces/imateria';
import { ProfesorService } from '../../../Servicios/profesor.service';
import { IProfesor } from '../../../Dominio/Interfaces/iprofesor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materia-disponible',
  templateUrl: './materia-disponible.component.html',
  styleUrls: ['./materia-disponible.component.css']
})
export class MateriaDisponibleComponent implements OnInit {

  _Materia: IMateria;
  Profesor: IProfesor;

  @Input()
  set Materia(materia: IMateria) {
    this._Materia = materia;
    this.profesorSvc.Cargar(materia.ProfesorId).subscribe(profesor => this.Profesor = profesor);
  }

  @Input()
  UrlMasInformacion = '/materia/detalle';

  constructor(private profesorSvc: ProfesorService, private router: Router) { }

  ngOnInit() {

  }

  MasInformacion(): void {
    this.router.navigate([this.UrlMasInformacion, this._Materia.Id])
  }

}
