import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasInscritasComponent } from './componentes/materias-inscritas/materias-inscritas.component';
import { MateriasAprobadasComponent } from './componentes/materias-aprobadas/materias-aprobadas.component';
import { InfraestructuraModule } from '../Infraestructura/infraestructura.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MateriasInscritasComponent,
    MateriasAprobadasComponent
  ],
  imports: [
    CommonModule,
    InfraestructuraModule,
    FormsModule,
    RouterModule
  ]
})
export class EstudianteModule { }
