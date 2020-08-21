import { Pipe, PipeTransform } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Pipe({
  name: 'cut'
})
export class CutPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value.length > args){
      return value.slice(0,args);
    }
  }

}
