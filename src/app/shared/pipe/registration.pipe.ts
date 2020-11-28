import { Pipe, PipeTransform } from '@angular/core';

/*
 * Put a mask into registration value
 * Usage:
 *   value | registrationPipe
 * Example:
 *   {{ 0123456789 | registrationPipe }}
 *   formats to: 01.234.567-89
*/
@Pipe({name: 'registrationPipe'})
export class RegistrationPipe implements PipeTransform {

  transform(value: string) {
    const first = value.substring(0, 2);
    const second = value.substring(2, 5);
    const third = value.substring(5, 8);
    const fourth = value.substring(8, 10);
    return first.concat('.').concat(second)
                .concat('.').concat(third)
                .concat('-').concat(fourth);
  }

}
