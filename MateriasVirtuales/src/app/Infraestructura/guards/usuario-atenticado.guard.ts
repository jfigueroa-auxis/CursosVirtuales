import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, flatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAtenticadoGuard implements CanActivate, CanActivateChild {

  constructor(private auth: AngularFireAuth, private router: Router) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return from(this.auth.authState).pipe(
      //tap(user => console.log(user)),
      map(user => user ? true : this.router.parseUrl('/login'))
    );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
}
