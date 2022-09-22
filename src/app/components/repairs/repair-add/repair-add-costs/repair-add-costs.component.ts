import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../../helpers/validator/form.validator';
import { debounceTime, distinctUntilChanged } from 'rxjs';

export interface RepairPart {
    name: FormControl<string>;
    count: FormControl<number>;
    tax: FormControl<number>;
    priceBuyNetto: FormControl<number>;
    priceNetto: FormControl<number>;
    priceBrutto: FormControl<number>;
}

export interface RepairCosts {
    parts: FormArray;
}

@Component({
    selector: 'app-repair-add-costs',
    templateUrl: './repair-add-costs.component.html',
    styleUrls: ['./repair-add-costs.component.scss'],
})
export class RepairAddCostsComponent implements OnInit {
    @Output() costsChange = new EventEmitter<FormGroup<RepairCosts>>();
    form!: FormGroup<RepairCosts>;

    get parts() {
        return this.form.controls['parts'] as FormArray;
    }

    getFormError = this.formValidators.getFormError;

    constructor(private formBuilder: FormBuilder, private formValidators: FormValidator) {}

    ngOnInit(): void {
        this.createForm();

        /** EMIT FORM TOO PARENT **/
        this.costsChange.emit(this.form);
        this.form.valueChanges.subscribe(() => this.costsChange.emit(this.form));
    }

    createForm(): void {
        this.form = this.formBuilder.group({
            parts: this.formBuilder.array([]),
        });

        this.addPart();
    }

    addPart(): void {
        const part: FormGroup<RepairPart> = this.formBuilder.group({
            name: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, this.formValidators.namePattern],
            }),
            count: new FormControl(1, {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.min(1),
                    this.formValidators.numberPattern,
                ],
            }),
            priceBuyNetto: new FormControl(0, {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.min(0),
                    this.formValidators.floatPattern,
                ],
            }),
            priceNetto: new FormControl(0, {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.min(0),
                    this.formValidators.floatPattern,
                ],
            }),
            priceBrutto: new FormControl(0, {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.min(0),
                    this.formValidators.floatPattern,
                ],
            }),
            tax: new FormControl(23, {
                nonNullable: true,
                validators: [
                    Validators.required,
                    Validators.min(0),
                    this.formValidators.floatPattern,
                ],
            }),
        });

        this.parts.push(part);
    }

    deletePart(index: number): void {
        if (this.parts.length > 1) this.parts.removeAt(index);
    }

    setCount(index: number): void {
        this.setPriceBuy(index);
    }

    setPriceBuy(index: number): void {
        const part = this.parts.at(index);
        const { count, tax, priceBuyNetto } = this.getPartRow(index);

        part.get('priceNetto')?.setValue((count * priceBuyNetto).toFixed(2));

        part.get('priceBrutto')?.setValue(this.toBrutto(count * priceBuyNetto, tax));
    }

    changePriceNetto(index: number): void {
        const part = this.parts.at(index);
        const { count, tax, priceNetto } = this.getPartRow(index);

        part.get('priceBrutto')?.setValue(this.toBrutto(priceNetto, tax));
        part.get('priceBuyNetto')?.setValue(priceNetto / count);
    }

    changePriceBrutto(index: number): void {
        const part = this.parts.at(index);
        const { count, tax, priceBrutto } = this.getPartRow(index);

        part.get('priceNetto')?.setValue(this.toNetto(priceBrutto, tax));
        part.get('priceBuyNetto')?.setValue(this.toNetto(priceBrutto / count, tax));
    }

    private getPartRow(index: number) {
        const part = this.parts.at(index);
        return {
            count: part.get('count')?.value || 0,
            tax: part.get('tax')?.value || 23,
            priceBuyNetto:
                parseFloat(String(part.get('priceBuyNetto')?.value).replace(',', '.')) || 0,
            priceNetto: parseFloat(String(part.get('priceNetto')?.value).replace(',', '.')) || 0,
            priceBrutto: parseFloat(String(part.get('priceBrutto')?.value).replace(',', '.')) || 0,
        };
    }

    private toBrutto(price: number, tax: number) {
        const procent = 1 + tax / 100;

        return (price * procent).toFixed(2);
    }

    private toNetto(price: number, tax: number) {
        const procent = 1 + tax / 100;

        return (price / procent).toFixed(2);
    }
}
