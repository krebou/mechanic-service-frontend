import { ChangeDetectionStrategy, Component, Input, Self } from '@angular/core';
import { RepairSummaryCostsPresenter } from '../../presenters/repair-summary-costs.presenter';
import { RepairPart } from '../../../../interface/repair.interface';

@Component({
    selector: 'app-repair-summary-costs-ui',
    templateUrl: './repair-summary-costs.component.html',
    styleUrls: ['./repair-summary-costs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RepairSummaryCostsPresenter],
})
export class RepairSummaryCostsComponent {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @Input() set formCosts(costs: RepairPart[]) {
        this.presenter.costs = costs;
    }

    get summaryCost() {
        return this.presenter.summaryCost;
    }

    colClassLeft = 'col-info-left col';
    colClassRight = 'col-info-right col-12 col-sm-6 col-xxl-5';

    /***************  CONSTRUCTOR  ***************/

    constructor(@Self() private presenter: RepairSummaryCostsPresenter) {}
}
