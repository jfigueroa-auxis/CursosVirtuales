import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { IDocumentoAdjunto } from '../Dominio/Interfaces/idocumento-adjunto';
import { flatMap } from 'rxjs/operators';
import { MateriaService } from './materia.service';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private storage: AngularFireStorage, private http: HttpClient, private materiaSvc: MateriaService) { }

  CargarArchivo(documento: IDocumentoAdjunto): AngularFireUploadTask {
    if (documento.DocumentoId === null || documento.DocumentoId === "")
      throw new Error("El documento no tiene un id válido");

    if (!this.materiaSvc.HayUnaMateria)
      throw new Error("No hay una materia cargada en el contexto");

    const filePath = this.path(documento.DocumentoId);
    console.info(filePath);
    return this.storage.upload(filePath, documento.Archivo, { customMetadata: { Nombre: documento.Nombre } });
  }

  ObtenerUrl(documentoId: string): Observable<any> {
    const ref = this.storage.ref(this.path(documentoId));
    return ref.getDownloadURL();
  }

  DescargarArchivo(documento: IDocumentoAdjunto): void {
    this.ObtenerUrl(documento.DocumentoId).pipe(
      flatMap(url => this.http.get(url, { responseType: 'blob' }))
    ).subscribe(blob => {
      const control = document.createElement('a');
      control.setAttribute('href', window.URL.createObjectURL(blob));
      control.setAttribute('download', documento.Nombre);
      document.body.appendChild(control);
      control.click();
      control.parentNode.removeChild(control);
    })
  }

  BorrarArchivo(documentoId: string): Observable<any> {
    const ref = this.storage.ref(this.path(documentoId));
    return ref.delete();
  }

  private path(documentoId: string): string {
    return this.materiaSvc.MateriaId + "/" + documentoId;
  }
}
