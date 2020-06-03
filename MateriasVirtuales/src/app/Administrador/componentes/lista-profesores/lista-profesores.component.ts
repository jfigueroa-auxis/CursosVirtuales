import { Component, OnInit, ViewChild } from '@angular/core';
import { IProfesor } from '../../../Dominio/Interfaces/iprofesor';
import { ProfesorService } from '../../../Servicios/profesor.service';
import { Router } from '@angular/router';
import { AlertasComponent } from '../../../Infraestructura/componentes/alertas/alertas.component';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.css']
})
export class ListaProfesoresComponent implements OnInit {

  Profesores: IProfesor[] = [];

  @ViewChild('alertas', { static: false }) alertas: AlertasComponent;

  constructor(private profesorSvc: ProfesorService, private router: Router) { }

  ngOnInit() {
    this.profesorSvc.ListarProfesores().subscribe(profesores => this.Profesores = profesores);
  }

  registrarProfesor(): void {
    this.router.navigate(['/administrador/registrar-profesor'])
  }

  cambiarEstado(profesor: IProfesor): void {
    profesor.Activo = !profesor.Activo;
    this.profesorSvc.ActualizarProfesor(profesor).subscribe(() => { },
      () => this.alertas.Error("No se pudo cambiar el estado del profesor"))
  }
}
