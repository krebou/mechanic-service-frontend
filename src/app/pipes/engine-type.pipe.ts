import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'engineType',
})
export class EngineTypePipe implements PipeTransform {
    private engineTypes = {
        PETROL: 'Benzyna',
        DIESEL: 'Diesel',
        PETROL_LPG: 'Benzyna + LPG',
        PETROL_CNG: 'Benzyna + CNG',
        HYBRID: 'Hybryda',
        HYDROGEN: 'Wodór',
        ELECTRIC: 'Elekryczny',
        ETANOL: 'Etanol',
    };

    transform(
        value:
            | 'PETROL'
            | 'DIESEL'
            | 'PETROL_LPG'
            | 'PETROL_CNG'
            | 'HYBRID'
            | 'HYDROGEN'
            | 'ELECTRIC'
            | 'ETANOL'
    ): string {
        return this.engineTypes[value] || 'none';
    }
}
