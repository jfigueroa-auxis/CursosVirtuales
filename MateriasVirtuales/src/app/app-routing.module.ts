import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MateriasPropiasComponent } from './Profesor/componentes/materias-propias/materias-propias.component';
import { DetalleMateriaComponent } from './Materia/componentes/detalle-materia/detalle-materia.component';
import { ParametrosComponent } from './Profesor/componentes/parametros/parametros.component';
import { MateriasDisponiblesComponent } from './Materia/componentes/materias-disponibles/materias-disponibles.component';
import { EditarMateriaComponent } from './Materia/componentes/editar-materia/editar-materia.component';
import { IniciarSesionComponent } from './Paginas/iniciar-sesion/iniciar-sesion.component';
import { TemplatePrincipalComponent } from './Paginas/template-principal/template-principal.component';
import { RegistrarseComponent } from './Paginas/registrarse/registrarse.component';
import { MateriasInscritasComponent } from './estudiante/componentes/materias-inscritas/materias-inscritas.component';
import { EstudioComponent } from './Materia/componentes/estudio/estudio.component';
import { RecorridoComponent } from './Materia/componentes/recorrido/recorrido.component';
import { MateriasAprobadasComponent } from './estudiante/componentes/materias-aprobadas/materias-aprobadas.component';
import { LandPageComponent } from './Paginas/land-page/land-page.component';
import { NoEncontradaComponent } from './Paginas/no-encontrada/no-encontrada.component';
import { ResultadoRegistroComponent } from './Paginas/resultado-registro/resultado-registro.component';
import { UsuarioAtenticadoGuard } from './Infraestructura/guards/usuario-atenticado.guard';
import { NoAutorizadoComponent } from './Paginas/no-autorizado/no-autorizado.component';
import { EsProfesorGuard } from './Infraestructura/guards/es-profesor.guard';
import { EsEstudianteGuard } from './Infraestructura/guards/es-estudiante.guard';
import { EsAdministrativoGuard } from './Infraestructura/guards/es-administrativo.guard';
import { ResetClaveComponent } from './Paginas/reset-clave/reset-clave.component';
import { ListaEstudiantesComponent } from './Administrador/componentes/lista-estudiantes/lista-estudiantes.component';
import { ListaProfesoresComponent } from './Administrador/componentes/lista-profesores/lista-profesores.component';
import { ListaMateriasComponent } from './Administrador/componentes/lista-materias/lista-materias.component';
import { InformacionCursoComponent } from './Paginas/informacion-curso/informacion-curso.component';
import { RolGuard } from './Infraestructura/guards/rol.guard';
import { RegistrarProfesorComponent } from './Administrador/componentes/registrar-profesor/registrar-profesor.component';
import { MateriaSuspendidaComponent } from './Paginas/materia-suspendida/materia-suspendida.component';
import { MateriaEstaActivaGuard } from './Infraestructura/guards/materia-esta-activa.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'land-page',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TemplatePrincipalComponent,
    canActivate: [UsuarioAtenticadoGuard],
    canActivateChild: [UsuarioAtenticadoGuard],
    children: [
      {
        path: 'materia',
        redirectTo: 'curso',
        pathMatch: 'prefix'
      },
      {
        path: 'curso',
        children: [
          {
            path: 'detalle/:id',
            component: DetalleMateriaComponent
          },
          {
            path: 'recorrido/:id',
            component: RecorridoComponent,
            canActivate: [RolGuard],
            data: {
              requiredRoles: ["administrador", "profesor"]
            }
          },
          {
            path: 'estudio/:id',
            component: EstudioComponent,
            canActivate: [EsEstudianteGuard, MateriaEstaActivaGuard]
          },
          {
            path: 'disponibles',
            component: MateriasDisponiblesComponent
          },
          {
            path: 'editar',
            component: EditarMateriaComponent,
            canActivate: [EsProfesorGuard]
          }
        ]
      },
      {
        path: 'profesor',
        canActivateChild: [EsProfesorGuard],
        children: [
          {
            path: '',
            redirectTo: 'mismaterias',
            pathMatch: 'prefix'
          },
          {
            path: 'mismaterias',
            redirectTo: 'miscursos',
            pathMatch: 'prefix'
          },
          {
            path: 'miscursos',
            component: MateriasPropiasComponent
          },
          {
            path: 'parametros',
            component: ParametrosComponent
          }
        ]
      },
      {
        path: 'estudiante',
        canActivateChild: [EsEstudianteGuard],
        children: [
          {
            path: '',
            redirectTo: 'inscritos',
            pathMatch: 'prefix'
          },
          {
            path: 'inscritos',
            component: MateriasInscritasComponent
          },
          {
            path: 'aprobados',
            component: MateriasAprobadasComponent
          }
        ]
      },
      {
        path: 'administrador',
        canActivateChild: [EsAdministrativoGuard],
        children: [
          {
            path: 'estudiantes',
            component: ListaEstudiantesComponent
          },
          {
            path: 'profesores',
            component: ListaProfesoresComponent
          },
          {
            path: 'cursos',
            component: ListaMateriasComponent
          },
          {
            path: 'registrar-profesor',
            component: RegistrarProfesorComponent
          },
          {
            path: 'cursos-estudiante/:estudianteId',
            component: MateriasInscritasComponent
          },
          {
            path: 'cursos-profesor/:profesorId',
            component: MateriasPropiasComponent
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: IniciarSesionComponent
  },
  {
    path: 'registro',
    component: RegistrarseComponent
  },
  {
    path: 'land-page',
    component: LandPageComponent,
  },
  {
    path: 'confirmacion-registro',
    component: ResultadoRegistroComponent
  },
  {
    path: 'no-autorizado',
    component: NoAutorizadoComponent
  },
  {
    path: 'reestablecer-clave',
    component: ResetClaveComponent
  },
  {
    path: 'informacion-curso/:id',
    component: InformacionCursoComponent
  },
  {
    path: 'curso-suspendido',
    component: MateriaSuspendidaComponent
  },
  {
    path: '**',
    component: NoEncontradaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
