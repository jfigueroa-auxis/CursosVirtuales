import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-interrogar',
  templateUrl: './interrogar.component.html',
  styleUrls: ['./interrogar.component.css']
})
export class InterrogarComponent implements OnInit {

  @Input() pregunta: string;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
