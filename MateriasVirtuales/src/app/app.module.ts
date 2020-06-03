import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuLateralComponent } from './Paginas/menu-lateral/menu-lateral.component';
import { BarraSuperiorComponent } from './Paginas/barra-superior/barra-superior.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { MateriaModule } from './Materia/materia.module';
import { ProfesorModule } from './Profesor/profesor.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { IniciarSesionComponent } from './Paginas/iniciar-sesion/iniciar-sesion.component';
import { TemplatePrincipalComponent } from './Paginas/template-principal/template-principal.component';
import { RegistrarseComponent } from './Paginas/registrarse/registrarse.component';
import { EstudianteModule } from './estudiante/estudiante.module';
import { LandPageComponent } from './Paginas/land-page/land-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { InfraestructuraModule } from './Infraestructura/infraestructura.module';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { NoEncontradaComponent } from './Paginas/no-encontrada/no-encontrada.component';
import { ResultadoRegistroComponent } from './Paginas/resultado-registro/resultado-registro.component';
import { NoAutorizadoComponent } from './Paginas/no-autorizado/no-autorizado.component';
import { ResetClaveComponent } from './Paginas/reset-clave/reset-clave.component';
import { AdministradorModule } from './Administrador/administrador.module';
import { InformacionCursoComponent } from './Paginas/informacion-curso/informacion-curso.component';
import { NavPrincipalComponent } from './Paginas/nav-principal/nav-principal.component';
import { MateriaSuspendidaComponent } from './Paginas/materia-suspendida/materia-suspendida.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuLateralComponent,
    BarraSuperiorComponent,
    IniciarSesionComponent,
    TemplatePrincipalComponent,
    RegistrarseComponent,
    NoEncontradaComponent,
    ResultadoRegistroComponent,
    LandPageComponent,
    NoAutorizadoComponent,
    ResetClaveComponent,
    InformacionCursoComponent,
    NavPrincipalComponent,
    MateriaSuspendidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MateriaModule,
    ProfesorModule,
    EstudianteModule,
    AdministradorModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireFunctionsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfraestructuraModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
