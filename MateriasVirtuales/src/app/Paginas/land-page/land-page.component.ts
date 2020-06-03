import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/Servicios/materia.service';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css']
})
export class LandPageComponent implements OnInit {

  Materias = [];

  constructor(private materiaSvc: MateriaService) { }

  ngOnInit() {
    this.materiaSvc.CargarMateriasDisponibles().subscribe(materias => {
        this.Materias = materias
    });
  }

}
