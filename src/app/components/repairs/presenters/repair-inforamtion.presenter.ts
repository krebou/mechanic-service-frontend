import { Inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormValidator } from '../../../helpers/validator/form.validator';
import { REPAIR_STATUS } from '../../../injectionTokens/repair-status.injection-token';
import { REPAIR_TYPES } from '../../../injectionTokens/repair-types.injection-token';
import { Repair } from '../../../interface/repair.interface';

@Injectable()
export class RepairInforamtionPresenter {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    set information(info: Pick<Repair, 'mileage' | 'type' | 'status'>) {
        this.form.get('mileage')?.setValue(info.mileage);
        this.form.get('type')?.setValue(info.type);
        this.form.get('status')?.setValue(info.status);
    }

    form = this.fb.nonNullable.group({
        type: new FormControl('repair', {
            validators: [Validators.required],
        }),
        status: new FormControl('processing', {
            validators: [Validators.required],
        }),
        mileage: new FormControl<number | null>(null, {
            validators: [this.formValidator.numberPattern],
            nonNullable: false,
        }),
    });

    getFormError = this.formValidator.getFormError;

    /***************  CONSTRUCTOR  ***************/

    constructor(
        private fb: FormBuilder,
        private formValidator: FormValidator,
        @Inject(REPAIR_TYPES) public repairTypes: string[],
        @Inject(REPAIR_STATUS) public repairStatus: string[]
    ) {}
}
