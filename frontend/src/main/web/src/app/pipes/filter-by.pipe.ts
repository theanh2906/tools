import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(item: any[], key: string): any {
    if (!item || !key) {
      return [];
    } else if (key.indexOf("=") > -1) {
      const att = key.split('=')[0];
      const val = key.split('=')[1];
      return item.filter(i => i[att] === val);
    } else if (key.indexOf('>') > -1) {
      const att = key.split('>')[0];
      const val = key.split('>')[1];
      return item.filter(i => i[att] > val);
    } else if (key.indexOf('<') > -1) {
      const att = key.split('<')[0];
      const val = key.split('<')[1];
      return item.filter(i => i[att] < val);
    } else if (key.indexOf('!=') > -1) {
      const att = key.split('!=')[0];
      const val = key.split('!=')[1];
      return item.filter(i => i[att] !== val);
    } else if (key.indexOf('>=') > -1) {
      const att = key.split('>=')[0];
      const val = key.split('>=')[1];
      return item.filter(i => i[att] >= val);
    } else if (key.indexOf('<=') > -1) {
      const att = key.split('<=')[0];
      const val = key.split('<=')[1];
      return item.filter(i => i[att] <= val);
    }
  }

}
