import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultado-registro',
  templateUrl: './resultado-registro.component.html',
  styleUrls: ['./resultado-registro.component.css']
})
export class ResultadoRegistroComponent implements OnInit {

  Mensaje = "";
  Clase = "";

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.Mensaje = this.router.snapshot.paramMap.get("mensaje");
    const color = this.router.snapshot.paramMap.get('color');
    this.Clase = color === 'verde' ? 'alert alert-success' : 'alert alert-warning'; 
  }

}
