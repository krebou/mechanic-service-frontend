import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../helpers/validator/form.validator';
import { VehiclesService } from '../vehicles.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { setSnackbar } from '../../snackbar/store/snackbar.actions';
import { environment } from '../../../../environments/environment';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../interface/client';
import { debounceTime, delay, map, startWith, Subscription, switchMap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
    ClientFormDialogAction,
    ClientFormDialogComponent,
} from '../../clients/dialogs/client-form-dialog/client-form-dialog.component';
import { Vehicle } from '../../../interface/vehicle.interface';

export type VehicleFormDialogAction = 'add' | 'edit';

interface AddVehicleForm {
    type: FormControl<string>;
    plate: FormControl<string>;
    mark: FormControl<string>;
    model: FormControl<string>;
    year: FormControl<number>;
    vin: FormControl<string>;
    clientId: FormControl<string>;
    engine: FormGroup<{
        engineType: FormControl<string>;
        engineSize: FormControl<number | null>;
        enginePower: FormControl<number | null>;
    }>;
}

@Component({
    selector: 'app-car-add-dialogs',
    templateUrl: './vehicle-form-dialog.component.html',
    styleUrls: ['./vehicle-form-dialog.component.scss'],
})
export class VehicleFormDialogComponent implements OnInit {
    action: ClientFormDialogAction = 'add';
    vehicle!: Vehicle;

    form!: FormGroup<AddVehicleForm>;
    private typeChanges$!: Subscription;

    getFormError = this.formValidator.getFormError;

    isSaving = false;

    searchClient = new FormControl('');
    listClients!: Client[];

    selectedClient!: Client | null;

    constructor(
        private formBuilder: FormBuilder,
        private formValidator: FormValidator,
        private vehiclesService: VehiclesService,
        private matDialogRef: MatDialogRef<VehicleFormDialogComponent>,
        private clientService: ClientsService,
        private store: Store,
        private dialogService: MatDialog,
        @Inject(MAT_DIALOG_DATA)
        private dialogData: { action: ClientFormDialogAction; vehicle: Vehicle }
    ) {}

    ngOnInit(): void {
        this.action = this.dialogData?.action;
        this.vehicle = this.dialogData?.vehicle || {};

        this.createForm();

        this.getClients();
    }

    createForm(): void {
        const year = new Date().getFullYear();

        this.form = this.formBuilder.nonNullable.group({
            type: ['CAR', [Validators.required, this.formValidator.vehice.typePattern]],
            plate: ['', [Validators.required, this.formValidator.vehice.platePattern]],
            year: [
                year,
                [
                    Validators.required,
                    Validators.min(1886),
                    Validators.max(year),
                    Validators.pattern(new RegExp(/^\d{4}$/i)),
                ],
            ],
            mark: ['', [Validators.required, this.formValidator.namePattern]],
            model: ['', [Validators.required, this.formValidator.namePattern]],
            vin: ['', [Validators.required, this.formValidator.vinPattern]],
            clientId: ['', [Validators.required]],
            engine: this.formBuilder.nonNullable.group({
                engineType: [
                    '',
                    [Validators.required, this.formValidator.vehice.engineTypePattern],
                ],
                engineSize: new FormControl(this.vehicle?.engine?.enginePower || null, {
                    nonNullable: false,
                    validators: [Validators.required, this.formValidator.floatPattern],
                }),
                enginePower: new FormControl(this.vehicle?.engine?.enginePower || null, {
                    nonNullable: false,
                    validators: [Validators.required, this.formValidator.numberPattern],
                }),
            }),
        });
    }

    makeValueToUpperCase(control: AbstractControl<any> | null, event: any): void {
        control?.setValue(control?.value.toUpperCase());
        control?.updateValueAndValidity();
    }

    setCar(): void {
        this.vehiclesService.setVehicle({ ...this.form.getRawValue() }).subscribe({
            next: () => {
                this.store.dispatch(
                    setSnackbar({
                        payload: {
                            color: 'success',
                            message: 'Pojazd został prawidłowo dodany',
                        },
                    })
                );
                this.matDialogRef.close({
                    status: 'added',
                });
            },
            error: (error) => {
                if (environment.production) console.error(error);

                this.store.dispatch(
                    setSnackbar({
                        payload: {
                            color: 'warn',
                            message: 'Wystąpil nieoczekiwany błąd',
                        },
                    })
                );
            },
        });
    }

    addClient(): void {
        this.dialogService
            .open(ClientFormDialogComponent, {
                backdropClass: 'darken',
            })
            .afterClosed()
            .subscribe({
                next: (response: { status: string; client: Client }) => {
                    if (response?.status === 'added' && response.client.id) {
                        this.form.get('clientId')?.setValue(response.client.id);
                        this.searchClient.setValue(response.client.name);

                        this.selectedClient = response.client;
                    }
                },
            });
    }

    private getClients(): void {
        this.searchClient.valueChanges
            .pipe(
                startWith([]),
                debounceTime(500),
                switchMap((value) => {
                    const _value = typeof value === 'string' ? value : '';
                    return this.clientService.getAllClients(1, 9999, 'createdAt', 'desc', _value);
                }),
                map((response) => {
                    return response.data;
                })
            )
            .subscribe({
                next: (clients) => {
                    this.listClients = clients;
                },
            });
    }

    clientSelected(event: MatAutocompleteSelectedEvent): void {
        this.selectedClient = event.option.value;
        this.form.get('clientId')?.setValue(event.option.value.id);
    }

    removeSelectedClient(): void {
        this.selectedClient = null;

        this.searchClient.setValue('');
        this.form.get('clientId')?.setValue('');
    }

    showName(client: Client): string {
        return client.name;
    }
}
