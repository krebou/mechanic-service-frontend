import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Vehicle } from '../../../interface/vehicle.interface';
import { debounceTime, map, startWith, Subject } from 'rxjs';
import { FormValidator } from '../../../helpers/validator/form.validator';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subscriptions } from '../../../extends/subscriptions';

@Injectable()
export class RepairSelectVehiclePresenter extends Subscriptions {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    getVehicles = new Subject<string>();
    getVehicles$ = this.getVehicles.asObservable();

    vehicleForm = new Subject<FormControl<string | null>>();
    vehicleForm$ = this.vehicleForm.asObservable();

    searchVehicle = new FormControl('');

    vehicleFormControl = new FormControl('', {
        validators: [Validators.required, this.formValidator.mongoId],
    });

    selectedVehicle: Vehicle | null = null;
    listVehicles!: Vehicle[];

    /***************  CONSTRUCTOR  ***************/

    constructor(private formValidator: FormValidator) {
        super();

        this.addSubscription = this.searchVehicle.valueChanges
            .pipe(
                startWith([]),
                debounceTime(500),
                map((value) => {
                    return typeof value === 'string' ? value : '';
                })
            )
            .subscribe((value) => this.getVehicles.next(value));

        this.addSubscription = this.vehicleFormControl.valueChanges.subscribe(() =>
            this.vehicleForm.next(this.vehicleFormControl)
        );
    }

    /***************  METHODS   ***************/

    vehicleSelected(event: MatAutocompleteSelectedEvent): void {
        this.selectedVehicle = event.option.value;
        this.vehicleFormControl.setValue(event.option.value.id);
    }

    removeSelectedVehicle(): void {
        this.selectedVehicle = null;

        this.searchVehicle.setValue('');
        this.vehicleFormControl.setValue('');
    }
}
