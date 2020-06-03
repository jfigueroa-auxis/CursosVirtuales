import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ILeccion } from '../../../Dominio/Interfaces/ileccion';
import { IDocumentoAdjunto } from '../../../Dominio/Interfaces/idocumento-adjunto';
import { ArchivoService } from '../../../Servicios/archivo.service';
import { FirebaseService } from '../../../Servicios/firebase.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MateriaService } from '../../../Servicios/materia.service';

@Component({
  selector: 'app-editar-leccion',
  templateUrl: './editar-leccion.component.html',
  styleUrls: ['./editar-leccion.component.css']
})
export class EditarLeccionComponent implements OnInit {

  ProgresoDeCarga: Observable<number>;
  CargaEnProceso = false;

  @Input()
  Leccion: ILeccion;

  @ViewChild('fileInput', { static: false }) FileInput: ElementRef;

  constructor(private archivoSvc: ArchivoService, private fireSvc: FirebaseService, private materiaSvc: MateriaService) { }

  ngOnInit() {
  }

  videoCargado(videoId: string): void {
    this.Leccion.VideoId = videoId;
    this.materiaSvc.Guardar().subscribe();
  }

  videoEliminado(): void {
    this.Leccion.VideoId = null;
    this.materiaSvc.Guardar().subscribe();
  }

  cargarAdjunto(event: FileList): void {
    const archivo = event.item(0);
    const documento = {} as IDocumentoAdjunto;
    documento.Archivo = archivo;
    documento.DocumentoId = this.fireSvc.generarId();
    documento.Nombre = archivo.name;

    this.CargaEnProceso = true;

    const procesoDeCarga = this.archivoSvc.CargarArchivo(documento);
    this.ProgresoDeCarga = procesoDeCarga.percentageChanges();

    procesoDeCarga.snapshotChanges().pipe(
      finalize(() => {
        this.Leccion.DocumentosAdjuntos.push(documento);
        this.FileInput.nativeElement.value = "";
        this.CargaEnProceso = false;
        this.materiaSvc.Guardar().subscribe();
      })
    ).subscribe()
  }

  eliminarAdjunto(Id: string): void {
    this.archivoSvc.BorrarArchivo(Id).subscribe(() => {
      const itemIdx = this.Leccion.DocumentosAdjuntos.findIndex(doc => doc.DocumentoId === Id);
      this.Leccion.DocumentosAdjuntos.splice(itemIdx, 1);
      this.materiaSvc.Guardar().subscribe();
    })
  }

  descargar(documento: IDocumentoAdjunto): void {
    this.archivoSvc.DescargarArchivo(documento);
  }

}
