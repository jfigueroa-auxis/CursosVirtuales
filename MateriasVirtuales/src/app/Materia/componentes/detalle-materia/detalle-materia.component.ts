import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriaService } from '../../../Servicios/materia.service';
import { IMateria } from '../../../Dominio/Interfaces/imateria';
import { Materia } from '../../../Dominio/Entidades/materia';
import { ArchivoService } from '../../../Servicios/archivo.service';
import { flatMap, map } from 'rxjs/operators';
import { EstudianteService } from '../../../Servicios/estudiante.service';
import { IMateriaInscrita } from '../../../Dominio/Interfaces/imateria-inscrita';
import { AlertasComponent } from '../../../Infraestructura/componentes/alertas/alertas.component';
import { FirebaseService } from '../../../Servicios/firebase.service';

@Component({
  selector: 'app-detalle-materia',
  templateUrl: './detalle-materia.component.html',
  styleUrls: ['./detalle-materia.component.css']
})
export class DetalleMateriaComponent implements OnInit {

  Materia: IMateria = Materia.Interface();
  VideoPath: string = null;
  EsEstudiante = false;
  EsProfesor = false;
  EsAdministrador = false;
  Inscrita = false;

  @ViewChild('alertas', { static: true })
  Alertas: AlertasComponent;

  constructor(private route: ActivatedRoute,
    private materiaSvc: MateriaService,
    private archivoSvc: ArchivoService,
    private estudianteSvc: EstudianteService,
    private firebaseSvc: FirebaseService
  ) { }

  ngOnInit() {
    const materiaId = this.route.snapshot.paramMap.get('id');
    if (materiaId !== null) {
      this.materiaSvc.CargarMateria(materiaId).pipe
        (
          map(materia => {
            this.Materia = materia;
            this.materiaSvc.setMateriaActual(materia)
            return materia.VideoId;
          }),
          flatMap((VideoId: string) => this.archivoSvc.ObtenerUrl(VideoId))
        )
        .subscribe(videoUrl => this.VideoPath = videoUrl)
    }
    this.firebaseSvc.RolesDelUsuario.subscribe(roles => {
      this.EsEstudiante = roles.includes('estudiante');
      this.EsProfesor = roles.includes('profesor');
      this.EsAdministrador = roles.includes('administrador');

      if (this.EsEstudiante)
        this.estudianteSvc.EstudianteActual.subscribe(estu => { if (estu) this.Inscrita = estu.MateriasInscritas.some(materia => materia.MateriaId === materiaId) })
    })
  }

  Inscribir(): void {
    const estudiante = this.estudianteSvc.Estudiante;
    const materiaAInscribir = {} as IMateriaInscrita;
    materiaAInscribir.Nombre = this.Materia.Nombre;
    materiaAInscribir.Aprobada = false;
    materiaAInscribir.FechaInscripcion = new Date();
    materiaAInscribir.MateriaId = this.Materia.Id;
    materiaAInscribir.UltimaActividad = 0;
    materiaAInscribir.ActividadesARealizar = Materia.actividades(this.Materia).filter(m => m.Descriptor !== 'tema').length
    estudiante.MateriasInscritas.push(materiaAInscribir);
    this.estudianteSvc.Actualizar().subscribe(() => {
      this.Alertas.Exito("El curso ha sido inscrito!, aparecerá en el listado de tus cursos inscritos.");
      this.Inscrita = true;
    }, () => {
      this.Alertas.Error("Se produjo un error al intentar inscribir el curso");
    })
  }
}
