import { Component, OnInit, ViewChild } from '@angular/core';
import { MateriaService } from 'src/app/Servicios/materia.service';
import { IMateria } from 'src/app/Dominio/Interfaces/imateria';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertasComponent } from '../../../Infraestructura/componentes/alertas/alertas.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InterrogarComponent } from '../../../Infraestructura/componentes/interrogar/interrogar.component';
import { from } from 'rxjs';
import { ProfesorService } from '../../../Servicios/profesor.service';

@Component({
  selector: 'app-materias-propias',
  templateUrl: './materias-propias.component.html',
  styleUrls: ['./materias-propias.component.css']
})
export class MateriasPropiasComponent implements OnInit {

  materias: IMateria[] = [];

  ModoConsulta = false;

  @ViewChild('alertas', { static: false }) alertas: AlertasComponent

  constructor(private profesorSvc: ProfesorService, private materiaSvc: MateriaService, private router: Router, private modalService: NgbModal, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('profesorId')) {
      this.ModoConsulta = true;
      const id = this.route.snapshot.paramMap.get('profesorId')
      this.profesorSvc.Cargar(id).subscribe(profe => this.materiaSvc.CargarMateriasProfesor(profe.Id).subscribe(mats => this.materias = mats));
    }
    else
      this.profesorSvc.profesorActual.subscribe(profe => {
        if (profe)
          this.materiaSvc.CargarMateriasProfesor(profe.Id).subscribe(mats => this.materias = mats)
      })
  }

  NuevaMateria(): void {
    this.router.navigate(['/materia/editar']);
  }

  verDetalle(materia: IMateria): void {
    if (!materia.Publicada && !this.ModoConsulta)
      this.router.navigate(['/materia/editar', { Id: materia.Id }])
    else
      this.router.navigate(['/materia/detalle', materia.Id])
  }

  BorrarMateria(materia: IMateria): void {
    if (materia.Publicada)
      return;

    const modal = this.modalService.open(InterrogarComponent)
    modal.componentInstance.pregunta = "Esta seguro que desea eliminar el curso?";
    from(modal.result).subscribe((respuesta: boolean) => {
      if (respuesta) {
        this.materiaSvc.BorrarMateria(materia.Id)
          .subscribe(
            () => this.alertas.Exito("El curso: " + materia.Nombre + " ha sido eliminado"),
            () => this.alertas.Error("No se pudo eliminar el curso")
          );
      }
    })
  }
}
