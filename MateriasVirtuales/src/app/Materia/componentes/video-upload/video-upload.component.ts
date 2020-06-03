import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ArchivoService } from '../../../Servicios/archivo.service';
import { FirebaseService } from '../../../Servicios/firebase.service';
import { IDocumentoAdjunto } from '../../../Dominio/Interfaces/idocumento-adjunto';
import { Observable, from } from 'rxjs';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.css']
})
export class VideoUploadComponent implements OnInit {

  _VideoId: string = null;
  VideoPath: string = null;
  ProgresoDeCarga: Observable<number>;

  @Input()
  set VideoId(valor: string) {
    if (valor !== undefined && valor !== null) {
      this._VideoId = valor;
      this.archivoSvc.ObtenerUrl(this._VideoId).subscribe(url => this.VideoPath = url);
    } else
      this._VideoId = null;
  }

  @Output()
  VideoCargado = new EventEmitter<string>();
  @Output()
  VideoEliminado = new EventEmitter<void>();

  constructor(
    private archivoSvc: ArchivoService,
    private fireSvc: FirebaseService) { }

  ngOnInit() {
  }


  cargarVideo(event: FileList): void {
    const archivo = event.item(0);
    const documento = {} as IDocumentoAdjunto;
    documento.Archivo = archivo;
    documento.DocumentoId = this.fireSvc.generarId();
    documento.Nombre = archivo.name;

    const procesoDeCarga = this.archivoSvc.CargarArchivo(documento);
    this.ProgresoDeCarga = procesoDeCarga.percentageChanges();

    let UpRef: UploadTaskSnapshot = null;

    procesoDeCarga.snapshotChanges().pipe(tap(algo => UpRef = algo),
      finalize(() => {
        from(UpRef.ref.getDownloadURL()).subscribe(url => this.VideoPath = url);
        this.VideoCargado.emit(documento.DocumentoId);
      })
    ).subscribe()
  }

  eliminarVideo(): void {
    this.archivoSvc.BorrarArchivo(this._VideoId).subscribe(() => {
      this.VideoPath = null;
      this.VideoEliminado.emit();
    })
  }
}
