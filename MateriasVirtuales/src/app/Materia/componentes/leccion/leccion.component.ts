import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { IDocumentoAdjunto } from '../../../Dominio/Interfaces/idocumento-adjunto';
import { ArchivoService } from '../../../Servicios/archivo.service';
import { ILeccion } from '../../../Dominio/Interfaces/ileccion';
import { Leccion } from '../../../Dominio/Entidades/leccion';

@Component({
  selector: 'app-leccion',
  templateUrl: './leccion.component.html',
  styleUrls: ['./leccion.component.css']
})
export class LeccionComponent implements OnInit {

  @Input()
  Leccion: ILeccion = Leccion.nuevaInterace();

  @Input()
  MostrarSiguiente = false;

  @Input()
  MostrarAnterior = false;

  VideoPath: string = null;

  @Output()
  Avanzar = new EventEmitter<string>();

  constructor(private archivoSvc: ArchivoService) { }

  ngOnInit() {
    this.archivoSvc.ObtenerUrl(this.Leccion.VideoId).subscribe(videoUrl => this.VideoPath = videoUrl)
  }

  descargar(documento: IDocumentoAdjunto): void {
    this.archivoSvc.DescargarArchivo(documento);
  }

  AnteriorActividad(): void {
    this.Avanzar.emit('atras');
  }

  SiguienteActividad(): void {
    this.Avanzar.emit('adelante');
  }
}
