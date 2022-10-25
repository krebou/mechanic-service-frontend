import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidator } from '../../../../helpers/validator/form.validator';
import { VehiclesService } from '../../../../services/vehicles.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { setSnackbar } from '../../../../store/snackbar/snackbar.actions';
import { environment } from '../../../../../environments/environment';
import { ClientsService } from '../../../../services/clients.service';
import { Client } from '../../../../interface/client.interface';
import { debounceTime, map, startWith, Subscription, switchMap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
    ClientFormDialogAction,
    ClientFormDialogComponent,
} from '../../../clients/dialogs/client-form-dialog/client-form-dialog.component';
import { AddVehicleForm, Vehicle } from '../../../../interface/vehicle.interface';

@Component({
    selector: 'app-car-add-dialogs',
    templateUrl: './vehicle-form-dialog.component.html',
    styleUrls: ['./vehicle-form-dialog.component.scss'],
})
export class VehicleFormDialogComponent implements OnInit {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    action: ClientFormDialogAction = 'add';
    vehicle!: Vehicle;

    form!: FormGroup<AddVehicleForm>;

    getFormError = this.formValidator.getFormError;

    isSaving = false;

    searchClient = new FormControl('');
    listClients!: Client[];

    selectedClient!: Client | null;

    /***************  CONSTRUCTOR  ***************/

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

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit(): void {
        /** DATA FROM PARENT **/
        this.action = this.dialogData?.action;
        this.vehicle = this.dialogData?.vehicle || {};

        this.createForm();

        this.getClients();
    }

    /***************  METHODS   ***************/

    createForm(): void {
        const year = new Date().getFullYear();

        this.form = this.formBuilder.nonNullable.group({
            type: [
                this.vehicle?.type || 'CAR',
                [Validators.required, this.formValidator.vehice.typePattern],
            ],
            plate: [
                this.vehicle?.plate || '',
                [Validators.required, this.formValidator.vehice.platePattern],
            ],
            year: [
                this.vehicle?.year || year,
                [
                    Validators.required,
                    Validators.min(1886),
                    Validators.max(year),
                    Validators.pattern(new RegExp(/^\d{4}$/i)),
                ],
            ],
            mark: [this.vehicle?.mark || '', [Validators.required, this.formValidator.namePattern]],
            model: [
                this.vehicle?.model || '',
                [Validators.required, this.formValidator.namePattern],
            ],
            vin: [this.vehicle?.vin || '', [Validators.required, this.formValidator.vinPattern]],
            clientId: [this.vehicle?.clientId || '', [Validators.required]],
            engine: this.formBuilder.nonNullable.group({
                engineType: [
                    this.vehicle?.engine?.engineType || '',
                    [Validators.required, this.formValidator.vehice.engineTypePattern],
                ],
                engineSize: new FormControl(this.vehicle?.engine?.engineSize || null, {
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

    setVehicle(): void {
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

    updatedVehicle(): void {
        this.vehiclesService
            .updateVehicle({ ...this.form.getRawValue(), id: this.vehicle.id })
            .subscribe({
                next: () => {
                    this.store.dispatch(
                        setSnackbar({
                            payload: {
                                color: 'success',
                                message: 'Pojazd został prawidłowo edytowany',
                            },
                        })
                    );
                    this.matDialogRef.close({
                        status: 'edited',
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
                data: {
                    action: 'add',
                },
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
                    let _value: string | undefined | object =
                        typeof value === 'string' ? value : undefined;

                    if (_value !== undefined) {
                        _value = {
                            name: {
                                $find: _value,
                            },
                        };
                    }

                    return this.clientService.getAllClients(1, 0, 'desc', 'createdAt', _value);
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
