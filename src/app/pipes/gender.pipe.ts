import { Pipe, PipeTransform } from '@angular/core';

const GENDERS = {
    female: 'Kobieta',
    male: 'Meżczyzna',
    divers: 'Divers',
};

@Pipe({
    name: 'gender',
})
export class GenderPipe implements PipeTransform {
    transform(value: string = ''): string {
        if (isValidGender(value, GENDERS)) return GENDERS[value];

        return value;
    }
}

function isValidGender(prop: string, obj: any): prop is keyof typeof GENDERS {
    return obj.hasOwnProperty(prop);
}
