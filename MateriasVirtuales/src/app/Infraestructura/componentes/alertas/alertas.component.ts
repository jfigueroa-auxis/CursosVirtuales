import { Component, OnInit } from '@angular/core';

interface Alert {
  tipo: string;
  mensaje: string;
}

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  alertas: Alert[] = [];

  constructor() { }

  ngOnInit() {
  }

  cerrar(alert: Alert) {
    this.alertas.splice(this.alertas.indexOf(alert), 1);
  }

  Exito(mensaje: string) {
    this.alertas.push({ mensaje: mensaje, tipo: 'success' })
  }

  Error(mensaje: string) {
    this.alertas.push({ mensaje: mensaje, tipo: 'danger' })
  }

  Advertencia(mensaje: string) {
    this.alertas.push({ mensaje: mensaje, tipo: 'warning' });
  }
}
