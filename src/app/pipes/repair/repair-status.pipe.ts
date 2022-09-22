import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'repairStatus',
})
export class RepairStatusPipe implements PipeTransform {
    private type = {
        processing: 'W realizacji',
        completed: 'Zrealizowany',
        cancelled: 'Anulowany',
        'on-hold': 'Wstrzymany',
        'check-draft': 'Szkic',
        'pending-pay': 'Oczekiwanie na płatność',
    };

    transform(value: string, ...args: unknown[]): unknown {
        if (this.isValid(value, this.type)) return this.type[value];
        return value;
    }

    isValid(prop: string, obj: any): prop is keyof typeof this.type {
        return obj.hasOwnProperty(prop);
    }
}
