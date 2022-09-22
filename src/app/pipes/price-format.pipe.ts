import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'priceFormat',
})
export class PriceFormatPipe implements PipeTransform {
    transform(value: string | number): string {
        return value + ' PLN';
    }
}
