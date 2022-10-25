import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'userRole',
})
export class UserRolePipe implements PipeTransform {
    private type = {
        admin: 'Administrator',
        mechanic: 'Mechanik',
    };

    transform(value: string, ...args: unknown[]): unknown {
        if (this.isValid(value, this.type)) return this.type[value];
        return value;
    }

    isValid(prop: string, obj: any): prop is keyof typeof this.type {
        return obj.hasOwnProperty(prop);
    }
}
