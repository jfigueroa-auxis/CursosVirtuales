import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProfesoresComponent } from './componentes/lista-profesores/lista-profesores.component';
import { ListaEstudiantesComponent } from './componentes/lista-estudiantes/lista-estudiantes.component';
import { ListaMateriasComponent } from './componentes/lista-materias/lista-materias.component';
import { InfraestructuraModule } from '../Infraestructura/infraestructura.module';
import { RegistrarProfesorComponent } from './componentes/registrar-profesor/registrar-profesor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListaProfesoresComponent,
    ListaEstudiantesComponent,
    ListaMateriasComponent,
    RegistrarProfesorComponent
  ],
  imports: [
    CommonModule,
    InfraestructuraModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AdministradorModule { }
