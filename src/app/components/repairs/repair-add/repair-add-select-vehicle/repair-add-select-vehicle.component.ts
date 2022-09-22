import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { debounceTime, map, startWith, Subscription, switchMap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Vehicle } from '../../../../interface/vehicle.interface';
import { VehiclesService } from '../../../vehicles/vehicles.service';
import { FormControl, Validators } from '@angular/forms';
import { FormValidator } from '../../../../helpers/validator/form.validator';

@Component({
    selector: 'app-repair-add-select-vehicle',
    templateUrl: './repair-add-select-vehicle.component.html',
    styleUrls: ['./repair-add-select-vehicle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairAddSelectVehicleComponent implements OnInit, OnDestroy {
    @Output() vehicleChange = new EventEmitter<FormControl>();

    searchVehicle = new FormControl('');
    vehicleId = new FormControl('', {
        validators: [Validators.required, this.formValidator.mongoId],
    });
    selectedVehicle!: Vehicle | null;
    listVehicles!: Vehicle[];

    vehicleId$!: Subscription;

    constructor(private vehiclesService: VehiclesService, private formValidator: FormValidator) {}

    ngOnInit(): void {
        this.getVehicle();

        this.vehicleChange.emit(this.vehicleId);
        this.vehicleId$ = this.vehicleId.valueChanges.subscribe(() =>
            this.vehicleChange.emit(this.vehicleId)
        );
    }

    private getVehicle(): void {
        this.searchVehicle.valueChanges
            .pipe(
                startWith([]),
                debounceTime(500),
                switchMap((value) => {
                    const _value = typeof value === 'string' ? value : '';
                    return this.vehiclesService.getAllVehicles(1, 0, 'createdAt', 'desc', {
                        plate: {
                            $find: _value,
                        },
                    });
                }),
                map((response) => {
                    return response.data;
                })
            )
            .subscribe({
                next: (clients) => {
                    this.listVehicles = clients;
                },
            });
    }

    vehicleSelected(event: MatAutocompleteSelectedEvent): void {
        this.selectedVehicle = event.option.value;
        this.vehicleId.setValue(event.option.value.id);
    }

    removeSelectedVehicle(): void {
        this.selectedVehicle = null;

        this.searchVehicle.setValue('');
        this.vehicleId?.setValue('');
    }

    displayAutocomplete(vehicle: Vehicle): string {
        return vehicle.plate;
    }

    ngOnDestroy() {
        this.vehicleId$.unsubscribe();
    }
}
