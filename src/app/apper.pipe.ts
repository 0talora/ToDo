import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apper'
})
export class ApperPipe implements PipeTransform {

  transform(value: unknown): unknown {
    return typeof value === 'string' ? value.toUpperCase() : value;
  }

}
