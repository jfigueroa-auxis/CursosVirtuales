import { Injectable } from '@angular/core';
import { IEstudiante } from '../Dominio/Interfaces/iestudiante';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { Util } from '../Infraestructura/helpers/util';
import { distinctUntilChanged } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

const COLECCION = "Estudiante";

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private ColeccionEstudiante: AngularFirestoreCollection<IEstudiante>;

  private _estudiante = new BehaviorSubject<IEstudiante>(null);

  get EstudianteId(): string {
    return this._estudiante.value.Id
  }

  get EstudianteActual(): Observable<IEstudiante> {
    return this._estudiante.asObservable()
  }

  get Estudiante(): IEstudiante {
    return this._estudiante.value;
  }


  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
    this.ColeccionEstudiante = this.firestore.collection<IEstudiante>(COLECCION);
    this.auth.authState.pipe(
      distinctUntilChanged()
    ).subscribe(user => {
      if (user)
        this.Cargar(user.uid).subscribe(this._estudiante)
      else
        this._estudiante.next(null)
    })
  }

  crear(estudiante: IEstudiante): Observable<void> {
    return from(this.ColeccionEstudiante.doc(estudiante.Id).set(Util.Serializar(estudiante)))
  }

  Cargar(id: string): Observable<IEstudiante> {
    return this.ColeccionEstudiante.doc<IEstudiante>(id).valueChanges()
  }

  Actualizar(): Observable<void> {
    const doc = this.ColeccionEstudiante.doc(this.EstudianteId);
    return from(doc.update(Util.Serializar(this.Estudiante)));
  }

  ActualizarEstudiante(estudiante: IEstudiante): Observable<void> {
    const doc = this.ColeccionEstudiante.doc(estudiante.Id);
    return from(doc.update(Util.Serializar(estudiante)));
  }

  Listar(): Observable<IEstudiante[]> {
    return this.ColeccionEstudiante.valueChanges();
  }
}
