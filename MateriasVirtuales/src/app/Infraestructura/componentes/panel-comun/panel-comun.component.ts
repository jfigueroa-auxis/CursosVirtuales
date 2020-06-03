import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panel-comun',
  templateUrl: './panel-comun.component.html',
  styleUrls: ['./panel-comun.component.css']
})
export class PanelComunComponent implements OnInit {

  @Input() Titulo: string;
  @Input() MostrarBoton = false;
  @Output() OnClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  navegar(): void {
    this.OnClick.emit();
  }
}
