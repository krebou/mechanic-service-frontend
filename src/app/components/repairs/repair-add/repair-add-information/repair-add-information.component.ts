import { Component, EventEmitter, Inject, InjectionToken, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../../helpers/validator/form.validator';

export const REPAIR_TYPES = new InjectionToken<string[]>('repair-types', {
    factory() {
        return ['repair', 'clima', 'service', 'other'];
    },
});

export const REPAIR_STATUS = new InjectionToken<string[]>('repair-types', {
    factory() {
        return ['processing', 'pending-pay', 'completed', 'cancelled', 'on-hold', 'check-draft'];
    },
});

@Component({
    selector: 'app-repair-add-information',
    templateUrl: './repair-add-information.component.html',
    styleUrls: ['./repair-add-information.component.scss'],
})
export class RepairAddInformationComponent implements OnInit {
    @Output() formChange = new EventEmitter();

    form!: FormGroup;

    getFormError = this.formValidator.getFormError;

    constructor(
        private fb: FormBuilder,
        @Inject(REPAIR_TYPES) public repairTypes: string[],
        @Inject(REPAIR_STATUS) public repairStatus: string[],
        private formValidator: FormValidator
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.form = this.fb.nonNullable.group({
            type: new FormControl('repair', {
                validators: [Validators.required],
            }),
            status: new FormControl('processing', {
                validators: [Validators.required],
            }),
            mileage: new FormControl(null, {
                validators: [this.formValidator.numberPattern],
                nonNullable: false,
            }),
        });

        this.formChange.emit(this.form);

        this.form.valueChanges.subscribe(() => this.formChange.emit(this.form));
    }
}
