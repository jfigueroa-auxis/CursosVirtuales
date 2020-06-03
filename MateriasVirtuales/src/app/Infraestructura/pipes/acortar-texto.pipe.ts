import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acortarTexto'
})
export class AcortarTextoPipe implements PipeTransform {

  transform(value: string, long?: number): string {
    if (long)
      return value.length <= long ? value : value.substring(0, long) + "..."
    return value;
  }
}
