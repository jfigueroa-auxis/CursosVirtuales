import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHostDinamico]'
})
export class HostDinamicoDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
