import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    const minutes = value % 60;
    const hours = Math.floor(value / 60);

    return `${this.transformTime(hours, 1)}h ${this.transformTime(minutes)}min`;
  }

  transformTime(num: number, padPlaces = 2) {
    return num.toString().padStart(padPlaces, '0');
  }
}
