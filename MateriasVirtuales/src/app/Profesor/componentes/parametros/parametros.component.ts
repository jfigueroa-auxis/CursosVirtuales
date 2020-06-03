import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfesorService } from '../../../Servicios/profesor.service';
import { IParametro } from '../../../Dominio/Interfaces/iparametro';
import { AlertasComponent } from '../../../Infraestructura/componentes/alertas/alertas.component';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {

  Parametros: IParametro = null;

  @ViewChild('alertasCmp', {static:false}) alertas: AlertasComponent

  constructor(private profesorSvc: ProfesorService) { }

  ngOnInit() {
    this.profesorSvc.profesorActual.subscribe(profe => {
      if (profe)
        this.Parametros = profe.Parametros
    })
  }

  guardar(): void {
    this.profesorSvc.Actualizar().subscribe(() => this.alertas.Exito("Se guardaron los paramateros correctamente"), () => this.alertas.Error("No se pudieron guardar los parámetros"));
  }
}
