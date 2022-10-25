import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { Repair } from '../../../../interface/repair.interface';
import { RepairInforamtionPresenter } from '../../presenters/repair-inforamtion.presenter';
import { FormGroup } from '@angular/forms';
import { Subscriptions } from '../../../../extends/subscriptions';

@Component({
    selector: 'app-repair-information-ui',
    templateUrl: './repair-information.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RepairInforamtionPresenter],
})
export class RepairInformationComponent extends Subscriptions implements OnInit {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @Input() information!: Pick<Repair, 'mileage' | 'type' | 'status'>;
    @Output() formInformation = new EventEmitter<FormGroup>();

    get form() {
        return this.presenter.form;
    }

    get repairTypes(): string[] {
        return this.presenter.repairTypes;
    }

    get repairStatus(): string[] {
        return this.presenter.repairStatus;
    }

    getFormError = this.presenter.getFormError;

    /***************  CONSTRUCTOR  ***************/

    constructor(private presenter: RepairInforamtionPresenter) {
        super();
    }

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit(): void {
        if (this.information) {
            this.presenter.information = this.information;
        }

        this.formInformation.emit(this.form);

        this.addSubscription = this.form.valueChanges.subscribe(() => {
            this.formInformation.emit(this.presenter.form);
        });
    }
}
