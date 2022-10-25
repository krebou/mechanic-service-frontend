import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'gender',
})
export class GenderPipe implements PipeTransform {
    private type = {
        female: 'Kobieta',
        male: 'Meżczyzna',
        divers: 'Divers',
    };

    transform(value: string = ''): string {
        if (this.isValid(value, this.type)) return this.type[value];

        return value;
    }

    isValid(prop: string, obj: any): prop is keyof typeof this.type {
        return obj.hasOwnProperty(prop);
    }
}
