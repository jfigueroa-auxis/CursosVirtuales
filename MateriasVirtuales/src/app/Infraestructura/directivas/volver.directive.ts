import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[appVolver]'
})
export class VolverDirective {

  constructor(private location: Location) { }

  @HostListener('click')
  onClick() {
    this.location.back();
  }
}
