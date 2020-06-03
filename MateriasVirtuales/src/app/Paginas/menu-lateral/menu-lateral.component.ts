import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../Servicios/firebase.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {

  EsEstudiante = false;
  EsProfesor = false;
  EsAdministrador = false;

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    this.firebaseSvc.RolesDelUsuario.subscribe(roles => {
      this.EsEstudiante = roles.includes('estudiante');
      this.EsProfesor = roles.includes('profesor');
      this.EsAdministrador = roles.includes('administrador');
    })
  }

}
