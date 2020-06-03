import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComunComponent } from './componentes/panel-comun/panel-comun.component';
import { PanelCollapsableComponent } from './componentes/panel-collapsable/panel-collapsable.component';
import { AlertasComponent } from './componentes/alertas/alertas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InterrogarComponent } from './componentes/interrogar/interrogar.component';
import { HostDinamicoDirective } from './directivas/host-dinamico.directive';
import { ContenedorComponent } from './componentes/contenedor/contenedor.component';
import { BarraProgresoCircularComponent } from './componentes/barra-progreso-circular/barra-progreso-circular.component';
import { AcortarTextoPipe } from './pipes/acortar-texto.pipe';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { VolverDirective } from './directivas/volver.directive';

@NgModule({
  declarations: [
    PanelComunComponent,
    PanelCollapsableComponent,
    AlertasComponent,
    InterrogarComponent,
    HostDinamicoDirective,
    ContenedorComponent,
    BarraProgresoCircularComponent,
    AcortarTextoPipe,
    VolverDirective
  ],
  imports: [
    CommonModule,
    NgbModule,
    AngularFireAuthModule
  ],
  exports: [
    PanelCollapsableComponent,
    AlertasComponent,
    PanelComunComponent,
    HostDinamicoDirective,
    ContenedorComponent,
    BarraProgresoCircularComponent,
    AcortarTextoPipe,
    VolverDirective
  ]
})
export class InfraestructuraModule { }
