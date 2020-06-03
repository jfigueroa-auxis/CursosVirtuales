import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProfesor } from '../Dominio/Interfaces/iprofesor';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Util } from '../Infraestructura/helpers/util';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

const COLECCION = "Profesor";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private ColeccionProfesor: AngularFirestoreCollection<IProfesor>;
  private _profesor = new BehaviorSubject<IProfesor>(null);

  get ProfesorId(): string {
    return this._profesor.value.Id;
  }

  get profesorActual(): Observable<IProfesor> {
    return this._profesor.asObservable()
  }

  get Profesor(): IProfesor {
    return this._profesor.value;
  }

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {
    this.ColeccionProfesor = this.firestore.collection<IProfesor>(COLECCION);
    this.auth.authState
      .pipe(
        distinctUntilChanged()
      ).subscribe(user => {
        if (user)
          this.Cargar(user.uid).subscribe(this._profesor);
        else
          this._profesor.next(null);
      })
  }

  crear(profesor: IProfesor): Observable<void> {
    profesor.Id = this.firestore.createId();
    return from(this.ColeccionProfesor.doc(profesor.Id).set(Util.Serializar(profesor)))
  }

  Cargar(id: string): Observable<IProfesor> {
    return this.ColeccionProfesor.doc<IProfesor>(id).valueChanges()
  }

  Actualizar(): Observable<void> {
    const doc = this.ColeccionProfesor.doc(this.ProfesorId);
    return from(doc.update(Util.Serializar(this.Profesor)));
  }

  ActualizarProfesor(profesor: IProfesor): Observable<void> {
    const doc = this.ColeccionProfesor.doc(profesor.Id);
    return from(doc.update(Util.Serializar(profesor)));
  }

  ListarProfesores(): Observable<IProfesor[]> {
    return this.ColeccionProfesor.valueChanges();
  }
}
