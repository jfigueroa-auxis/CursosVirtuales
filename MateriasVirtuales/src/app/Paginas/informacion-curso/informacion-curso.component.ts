import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriaService } from '../../Servicios/materia.service';
import { ArchivoService } from '../../Servicios/archivo.service';
import { IMateria } from '../../Dominio/Interfaces/imateria';
import { Materia } from '../../Dominio/Entidades/materia';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-informacion-curso',
  templateUrl: './informacion-curso.component.html',
  styleUrls: ['./informacion-curso.component.css']
})
export class InformacionCursoComponent implements OnInit {

  Materia: IMateria = Materia.Interface();
  VideoPath: string = null;

  constructor(private route: ActivatedRoute,
    private materiaSvc: MateriaService,
    private archivoSvc: ArchivoService,
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
  }
}
