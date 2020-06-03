import { Component, OnInit, ViewChild } from '@angular/core';
import { IEstudiante } from '../../../Dominio/Interfaces/iestudiante';
import { EstudianteService } from '../../../Servicios/estudiante.service';
import { AlertasComponent } from '../../../Infraestructura/componentes/alertas/alertas.component';

@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrls: ['./lista-estudiantes.component.css']
})
export class ListaEstudiantesComponent implements OnInit {

  Estudiantes: IEstudiante[] = [];

  @ViewChild('alertas', { static: false }) alertas: AlertasComponent;

  constructor(private estudianteSvc: EstudianteService) { }

  ngOnInit() {
    this.estudianteSvc.Listar().subscribe(estudiantes => this.Estudiantes = estudiantes)
  }

  cambiarEstado(estudiante: IEstudiante): void {
    estudiante.Activo = !estudiante.Activo;
    this.estudianteSvc.ActualizarEstudiante(estudiante)
      .subscribe(() => { },
        () => this.alertas.Error("No se pudo cambiar el estado del estudiante"))
  }

}
