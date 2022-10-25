import { Injectable } from '@angular/core';
import { RepairPart, RepairSummaryCost } from '../../../interface/repair.interface';

@Injectable()
export class RepairSummaryCostsPresenter {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    costs: RepairPart[] = [];

    get summaryCost(): RepairSummaryCost {
        const parts = this.costs;

        const priceNettoAll = parts
            .map((value) => +value['priceNetto'])
            .reduce((prev, current) => prev + current)
            .toFixed(2);

        const priceBruttoAll = parts
            .map((value) => +value['priceBrutto'])
            .reduce((prev, current) => prev + current)
            .toFixed(2);

        const countAll = parts
            .map((value) => +value['count'])
            .reduce((prev, current) => prev + current);

        return {
            countAll,
            priceNettoAll,
            priceBruttoAll,
            taxAll: (+priceBruttoAll - +priceNettoAll).toFixed(2),
        };
    }
}
