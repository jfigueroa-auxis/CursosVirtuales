import { Component, OnInit, ViewChild } from '@angular/core';
import { MateriaService } from 'src/app/Servicios/materia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from 'src/app/Dominio/Entidades/materia';
import { IMateria } from 'src/app/Dominio/Interfaces/imateria';
import { ILeccion } from '../../../Dominio/Interfaces/ileccion';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IEvaluacion } from '../../../Dominio/Interfaces/ievaluacion';
import { ProfesorService } from '../../../Servicios/profesor.service';
import { AlertasComponent } from '../../../Infraestructura/componentes/alertas/alertas.component';
import { InterrogarComponent } from '../../../Infraestructura/componentes/interrogar/interrogar.component';
import { from } from 'rxjs';
import { EditarLeccionComponent } from '../editar-leccion/editar-leccion.component';
import { EditarEvaluacionComponent } from '../editar-evaluacion/editar-evaluacion.component';
import { ITema } from '../../../Dominio/Interfaces/itema';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css']
})
export class EditarMateriaComponent implements OnInit {

  Materia: IMateria = Materia.Interface();
  private _temaSeleccionado: ITema;

  get Tema(): ITema {
    if (this._temaSeleccionado)
      return this._temaSeleccionado
    return this.Materia.Temas[0]
  }

  @ViewChild('alertasCmp', { static: false }) alertasCmp: AlertasComponent;

  constructor(private materiaSvc: MateriaService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private profesorSvc: ProfesorService,
    private router: Router) { }

  ngOnInit() {
    const materiaId = this.route.snapshot.paramMap.get('Id');
    if (materiaId !== null) {
      this.materiaSvc.CargarMateria(materiaId).subscribe(materia => {
        this.Materia = materia;
        this.materiaSvc.setMateriaActual(materia);
      })
    } else {
      const profe = this.profesorSvc.Profesor;
      this.Materia = Materia.construirMateria(profe.Parametros);
      this.Materia.ProfesorId = profe.Id;
      this.materiaSvc.setMateriaActual(this.Materia);
    }
  }

  VideoCargado(videoId: string): void {
    this.Materia.VideoId = videoId;
    this.Guardar();
  }

  VideoEliminado(): void {
    this.Materia.VideoId = null;
    this.Guardar();
  }

  Guardar(): void {
    this.materiaSvc.Guardar().subscribe(() => this.alertasCmp.Exito("Cambios guardados"),
      (err) => {
        this.alertasCmp.Error("No se pudieron guardar los cambios")
        console.error(err);
      });
  }

  Publicar(): void {
    const errores = new Materia(this.Materia).ValidarParaPublicar();
    if (errores.length > 0)
      this.alertasCmp.Error('No se puede publicar el curso, faltan datos por agregar');
    else {
      const modal = this.modalService.open(InterrogarComponent);
      modal.componentInstance.pregunta = "¿Está seguro que desea publicar el curso?. Una vez publicado, será visible para los estudiantes y no se podrá modificar";
      from(modal.result).subscribe((respuesta: boolean) => {
        if (respuesta) {
          this.Materia.Publicada = true;
          this.materiaSvc.Guardar().subscribe(() => {
            this.alertasCmp.Exito("El curso ha sido publicado")
            setTimeout(()=> this.router.navigate(['/profesor']), 2000)
          }, () => this.alertasCmp.Error("No se pudo publicar el curso"));
        }
      })
    }
  }

  verLeccion(leccion: ILeccion): void {
    const modalRef = this.modalService.open(EditarLeccionComponent);
    modalRef.componentInstance.Leccion = leccion;
  }

  verEvaluacion(parcial: IEvaluacion): void {
    const modalRef = this.modalService.open(EditarEvaluacionComponent);
    modalRef.componentInstance.Evaluacion = parcial;
  }

  seleccionarTema(tema: ITema): void {
    this._temaSeleccionado = tema;
  }
}
