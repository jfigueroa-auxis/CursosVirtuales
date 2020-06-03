import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriasPropiasComponent } from './componentes/materias-propias/materias-propias.component';
import { RouterModule } from '@angular/router';
import { ParametrosComponent } from './componentes/parametros/parametros.component';
import { FormsModule } from '@angular/forms';
import { InfraestructuraModule } from '../Infraestructura/infraestructura.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    MateriasPropiasComponent,
    ParametrosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InfraestructuraModule,
    NgbTooltipModule
  ]
})
export class ProfesorModule { }
