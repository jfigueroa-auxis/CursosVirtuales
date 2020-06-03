import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleMateriaComponent } from './componentes/detalle-materia/detalle-materia.component';
import { EvaluacionComponent } from './componentes/evaluacion/evaluacion.component';
import { LeccionComponent } from './componentes/leccion/leccion.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InfraestructuraModule } from '../Infraestructura/infraestructura.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VideoUploadComponent } from './componentes/video-upload/video-upload.component';
import { MateriasDisponiblesComponent } from './componentes/materias-disponibles/materias-disponibles.component';
import { MateriaDisponibleComponent } from './componentes/materia-disponible/materia-disponible.component';
import { EditarMateriaComponent } from './componentes/editar-materia/editar-materia.component';
import { InterrogarComponent } from '../Infraestructura/componentes/interrogar/interrogar.component';
import { EditarLeccionComponent } from './componentes/editar-leccion/editar-leccion.component';
import { EditarEvaluacionComponent } from './componentes/editar-evaluacion/editar-evaluacion.component';
import { EstudioComponent } from './componentes/estudio/estudio.component';
import { RecorridoComponent } from './componentes/recorrido/recorrido.component';
import { NavegadorComponent } from './componentes/navegador/navegador.component';
import { CursoCompletadoComponent } from './componentes/curso-completado/curso-completado.component';

@NgModule({
  declarations: [
    DetalleMateriaComponent,
    LeccionComponent,
    EvaluacionComponent,
    VideoUploadComponent,
    MateriasDisponiblesComponent,
    MateriaDisponibleComponent,
    EditarMateriaComponent,
    EditarLeccionComponent,
    EditarEvaluacionComponent,
    EstudioComponent,
    RecorridoComponent,
    NavegadorComponent,
    CursoCompletadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InfraestructuraModule,
    NgbModule
  ],
  entryComponents: [
    EditarLeccionComponent,
    EditarEvaluacionComponent,
    InterrogarComponent,
    LeccionComponent,
    EvaluacionComponent,
    CursoCompletadoComponent
  ],
  exports: [
    MateriaDisponibleComponent,
    DetalleMateriaComponent
  ]
})
export class MateriaModule { }
