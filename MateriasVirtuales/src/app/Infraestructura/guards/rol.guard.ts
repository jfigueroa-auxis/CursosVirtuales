import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../Servicios/firebase.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate, CanActivateChild {
  constructor(private firebase: FirebaseService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const rolesRequeridos = next.data.requiredRoles as string[];

    return this.firebase.RolesDelUsuario.pipe(map(rolesDelUsuario => rolesRequeridos.some(rol => rolesDelUsuario.includes(rol))), map(autorizado => autorizado ? true : this.router.parseUrl('/no-autorizado')));
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  
}
