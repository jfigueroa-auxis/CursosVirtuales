import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  get RolesDelUsuario(): Observable<string[]> {
    return from(this.auth.currentUser).pipe(flatMap(user => user ? this.obtenerRolDeUsuario(user) : from([])));
  }

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { }

  generarId(): string {
    return this.firestore.createId()
  }

  private obtenerRolDeUsuario(user: firebase.User): Observable<string[]> {
    return from(user.getIdTokenResult()).pipe(
      map(token => {
        const roles = []

        if (token.claims.profesor)
          roles.push('profesor')

        if (token.claims.estudiante)
          roles.push('estudiante');

        if (token.claims.administrador)
          roles.push('administrador')

        return roles;
      })
    )
  }
}
