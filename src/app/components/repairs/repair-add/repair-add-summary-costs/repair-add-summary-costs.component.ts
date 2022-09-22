import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DoCheck,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { RepairCosts } from '../repair-add-costs/repair-add-costs.component';
import { RepairSummaryCost } from '../../../../interface/repair.interface';
import { debounceTime, delay, distinctUntilChanged, finalize, Subscription } from 'rxjs';

@Component({
    selector: 'app-repair-add-summary-costs',
    templateUrl: './repair-add-summary-costs.component.html',
    styleUrls: ['./repair-add-summary-costs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairAddSummaryCostsComponent implements OnInit, OnDestroy {
    @Input() formCosts!: FormGroup<RepairCosts>;

    private _sub!: Subscription;

    colClassLeft = 'col-info-left col';
    colClassRight = 'col-info-right col-12 col-sm-6 col-xxl-5';

    constructor(private cdRef: ChangeDetectorRef) {}

    get parts() {
        return this.formCosts.controls['parts'] as FormArray;
    }

    get summaryCost(): RepairSummaryCost {
        const parts = this.parts.getRawValue();

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

    ngOnInit(): void {
        this._sub = this.formCosts.valueChanges
            .pipe(
                debounceTime(250),
                finalize(() => console.log('zakonczony'))
            )
            .subscribe(() => {
                this.cdRef.detectChanges();
            });
    }

    detectChanges() {
        this.cdRef.detectChanges();
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }
}
