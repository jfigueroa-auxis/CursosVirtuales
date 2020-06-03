import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-panel-collapsable',
  templateUrl: './panel-collapsable.component.html',
  styleUrls: ['./panel-collapsable.component.css']
})
export class PanelCollapsableComponent implements OnInit {

  @Input() Parent: string;

  @ViewChild("body", { static: false }) body: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  toggle(): void {
    $(this.body.nativeElement).toggle();
  }
}
