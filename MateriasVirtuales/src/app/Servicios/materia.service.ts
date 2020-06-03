import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Util } from '../Infraestructura/helpers/util';
import { IMateria } from '../Dominio/Interfaces/imateria';
import { tap } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';

const COLECCION = "Materia";

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private ColeccionMaterias: AngularFirestoreCollection<IMateria>;
  private _MateriaActual: IMateria = null;
  private EsUnaMateriaNueva = false;

  Materias: IMateria[];

  get MateriaId(): string {
    if (this._MateriaActual === null)
      return null;
    return this._MateriaActual.Id;
  }

  get HayUnaMateria(): boolean {
    return this._MateriaActual !== null;
  }

  constructor(private firestore: AngularFirestore, private firestoreSvc: FirebaseService) { 
    this.ColeccionMaterias = this.firestore.collection<IMateria>(COLECCION);
  }

  setMateriaActual(materia: IMateria): void {
    this._MateriaActual = materia;
    if (materia.Id === null) {
      materia.Id = this.firestoreSvc.generarId();
      this.EsUnaMateriaNueva = true;
    }
  }

  Guardar(): Observable<void | string> {
    if (this._MateriaActual === null)
      return throwError('No hay una materia cargada');
      
    if (this.EsUnaMateriaNueva)
      return this.Crear(this._MateriaActual);
    else
      return this.Actualizar(this._MateriaActual);
  }

  CargarMateria(materiaId: string): Observable<IMateria>{
    return this.ColeccionMaterias.doc<IMateria>(materiaId).valueChanges();
  }

  CargarMateriasProfesor(profesorId: string): Observable<IMateria[]>{
    return this.firestore.collection<IMateria>(COLECCION, ref => ref.where('ProfesorId', '==', profesorId))
      .valueChanges()
      .pipe(tap(data => this.Materias = data));
  }
  
  CargarTodasLasMaterias(): Observable<IMateria[]>{
    return this.ColeccionMaterias.valueChanges();
  }

  CargarMateriasDisponibles(): Observable<IMateria[]>{
    return this.firestore.collection<IMateria>(COLECCION, ref => ref.where('Publicada', '==', true).where('Suspendida','==',false)).valueChanges();
  }

  BorrarMateria(materiaId: string): Observable<void> {
    return from(this.ColeccionMaterias.doc(materiaId).delete())
  }

  private Crear(materia: IMateria): Observable<void> {
    if (materia.ProfesorId === null || materia.ProfesorId === undefined)
      return throwError("La materia no tiene asociado un profesor");

    return from(this.ColeccionMaterias.doc(materia.Id).set(Util.Serializar(materia)))
      .pipe(tap(() => this.EsUnaMateriaNueva = false));
  }

  Actualizar(materia: IMateria): Observable<void> {
    const doc = this.ColeccionMaterias.doc(materia.Id);
    return from(doc.update(Util.Serializar(materia)));
  }
}
