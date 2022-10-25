import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { RepairCostsPresenter } from '../../presenters/repair-costs.presenter';
import { FormGroup } from '@angular/forms';
import { RepairCostsFormGroup, RepairPart } from '../../../../interface/repair.interface';
import { Subscriptions } from '../../../../extends/subscriptions';

@Component({
    selector: 'app-repair-costs-ui',
    templateUrl: './repair-costs.component.html',
    styleUrls: ['./repair-costs.component.scss'],
    providers: [RepairCostsPresenter],
})
export class RepairCostsComponent extends Subscriptions implements OnInit {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @Input() set partsList(parts: RepairPart[]) {
        if (parts) {
            this.presenter.setParts(parts);
        }
    }
    @Output() formCosts = new EventEmitter<FormGroup<RepairCostsFormGroup>>();

    get form() {
        return this.presenter.form;
    }

    get parts() {
        return this.presenter.parts;
    }

    getFormError = this.presenter.getFormError;

    /***************  CONSTRUCTOR  ***************/

    constructor(@Self() private presenter: RepairCostsPresenter) {
        super();
    }

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit(): void {
        if (this.parts.length === 0) {
            this.addNewPart();
        }

        this.formCosts.emit(this.form);

        this.addSubscription = this.form.valueChanges.subscribe(() => {
            this.formCosts.emit(this.form);
        });
    }

    /***************  METHODS   ***************/

    setCount(index: number): void {
        this.presenter.setCount(index);
    }

    setPriceBuy(index: number): void {
        this.presenter.setPriceBuy(index);
    }

    changePriceNetto(index: number): void {
        this.presenter.changePriceNetto(index);
    }
    changePriceBrutto(index: number): void {
        this.presenter.changePriceBrutto(index);
    }

    deletePart(index: number): void {
        this.presenter.deletePart(index);
    }

    addNewPart(): void {
        this.presenter.addPart();
    }
}
