import { Component, OnInit, ViewChild } from '@angular/core';
import { IMateria } from '../../../Dominio/Interfaces/imateria';
import { MateriaService } from '../../../Servicios/materia.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InterrogarComponent } from '../../../Infraestructura/componentes/interrogar/interrogar.component';
import { from } from 'rxjs';
import { AlertasComponent } from '../../../Infraestructura/componentes/alertas/alertas.component';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.css']
})
export class ListaMateriasComponent implements OnInit {

  Materias: IMateria[] = [];

  @ViewChild('alertas', { static: false }) alertas: AlertasComponent;

  constructor(private materiaSvc: MateriaService, private modalService: NgbModal) { }

  ngOnInit() {
    this.materiaSvc.CargarTodasLasMaterias().subscribe(materias => this.Materias = materias)
  }

  cambiarEstado(materia: IMateria): void {
    if (!materia.Suspendida) {
      const modal = this.modalService.open(InterrogarComponent);
      modal.componentInstance.pregunta = "¿Está seguro que desea suspender el curso?. Los estudiantes que lo tengan inscrito no podran continuarlo.";
      from(modal.result).subscribe(respuesta => {
        if (respuesta) {
          materia.Suspendida = !materia.Suspendida;
          this.materiaSvc.Actualizar(materia).subscribe(() => this.alertas.Exito("Curso suspendido"), () => this.alertas.Error("No se pudo suspender el curso"));
        }
      })
    }
    else {
      materia.Suspendida = !materia.Suspendida;
      this.materiaSvc.Actualizar(materia).subscribe(() => this.alertas.Exito("Curso activado"), () => this.alertas.Error("No se pudo activar el curso"));
    }
  }
}
