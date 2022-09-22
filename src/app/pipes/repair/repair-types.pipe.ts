import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'repairTypes',
})
export class RepairTypesPipe implements PipeTransform {
    private type = {
        repair: 'Naprawa',
        clima: 'Klimatyzacja',
        service: 'Serwis',
        other: 'Inny',
    };

    transform(value: string, ...args: unknown[]): unknown {
        if (this.isValid(value, this.type)) return this.type[value];
        return value;
    }

    isValid(prop: string, obj: any): prop is keyof typeof this.type {
        return obj.hasOwnProperty(prop);
    }
}
