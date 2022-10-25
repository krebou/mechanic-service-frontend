import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userStatus',
})
export class UserStatusPipe implements PipeTransform {
    private type = {
        active: 'Aktywny',
        pending: 'Wstrzymany',
    };

    transform(value: string, ...args: unknown[]): unknown {
        if (this.isValid(value, this.type)) return this.type[value];
        return value;
    }

    isValid(prop: string, obj: any): prop is keyof typeof this.type {
        return obj.hasOwnProperty(prop);
    }
}
