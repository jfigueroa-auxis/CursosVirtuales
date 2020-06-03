import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MateriaService } from '../../Servicios/materia.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MateriaEstaActivaGuard implements CanActivate {

  constructor(private materiaSvc: MateriaService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.materiaSvc.CargarMateria(next.paramMap.get('id')).pipe(map(materia => !materia.Suspendida ? true : this.router.parseUrl('/curso-suspendido')));
  }
  
}
