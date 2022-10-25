import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, map, startWith, Subscription } from 'rxjs';
import { FormValidator } from '../../../../helpers/validator/form.validator';
import { Client, ClientFormGroup } from '../../../../interface/client.interface';
import { Store } from '@ngrx/store';
import { ClientsService } from '../../../../services/clients.service';
import { setSuccessSnackbar, setWarnSnackbar } from '../../../../store/snackbar/snackbar.actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export type ClientFormDialogAction = 'add' | 'edit';

@Component({
    selector: 'app-client-info-form-dialogs',
    templateUrl: './client-form-dialog.component.html',
    styleUrls: ['./client-form-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormDialogComponent implements OnInit, OnDestroy {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    action: ClientFormDialogAction = 'add';
    client!: Client;

    form!: FormGroup<ClientFormGroup>;
    private typeChange$!: Subscription;

    getFormError = this.formValidator.getFormError;

    isSaving = false;

    /***************  CONSTRUCTOR  ***************/

    constructor(
        private formBuilder: FormBuilder,
        private formValidator: FormValidator,
        private store: Store,
        private clientService: ClientsService,
        private matDialogRef: MatDialogRef<ClientFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        private dialogData: { action: ClientFormDialogAction; client: Client }
    ) {}

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit(): void {
        this.action = this.dialogData?.action;
        this.client = this.dialogData?.client || {};

        this.createForm();

        this.typeChange$ = this.form.controls['type'].valueChanges
            .pipe(
                startWith('personal'),
                map((value) => {
                    this.form.get('taxNumber')?.enable();
                    this.form.get('gender')?.enable();
                    return value;
                })
            )
            .subscribe({
                next: (value) => {
                    if (value === 'personal') this.form.get('taxNumber')?.disable();
                    if (value === 'business') this.form.get('gender')?.disable();
                },
            });
    }

    ngOnDestroy() {
        this.typeChange$.unsubscribe();
    }

    /***************  METHODS   ***************/

    createForm(): void {
        this.form = this.formBuilder.group({
            name: new FormControl(this.client?.name || '', {
                validators: [Validators.required, this.formValidator.namePattern],
            }),
            type: new FormControl(this.client?.type || 'personal', {
                nonNullable: true,
                validators: [Validators.required, this.formValidator.clientTypePattern],
            }),
            taxNumber: new FormControl(this.client?.taxNumber || '', {
                validators: [Validators.required, this.formValidator.numberPattern],
            }),
            phone: new FormControl(this.client?.phone || '', {
                validators: [Validators.required, this.formValidator.phonePattern],
            }),
            email: new FormControl(this.client?.email || '', {
                validators: this.formValidator.emailValidator(),
            }),
            gender: new FormControl(this.client?.gender || 'male', {
                nonNullable: true,
                validators: [Validators.required, this.formValidator.genderPattern],
            }),
            street: new FormControl(this.client?.street || '', {
                validators: [this.formValidator.addressPattern],
            }),
            city: new FormControl(this.client?.city || '', {
                validators: [this.formValidator.addressPattern],
            }),
            zipCode: new FormControl(this.client?.zipCode || '', {
                validators: [this.formValidator.zipCodePattern],
            }),
        });
    }

    saveClient(): void {
        const client = this.form.getRawValue() as Client;
        if (client.type === 'personal') delete client.taxNumber;
        if (client.type === 'business') delete client.gender;

        this.isSaving = true;

        if (this.action === 'add') {
            this.clientService
                .addClient(client)
                .pipe(finalize(() => (this.isSaving = false)))
                .subscribe({
                    next: (response) => this.onSaveClientSuccess(response),
                    error: () => this.onSaveClientError(),
                });
        }

        if (this.action === 'edit') {
            this.clientService
                .updateClient({ ...client, id: this.client.id })
                .pipe(finalize(() => (this.isSaving = false)))
                .subscribe({
                    next: () => this.onUpdateClientSuccess(),
                    error: () => this.onUpdateClientError(),
                });
        }
    }

    private onSaveClientSuccess(response: { id: string }): void {
        this.store.dispatch(setSuccessSnackbar({ message: 'Klient został prawidłowo dodany' }));

        this.matDialogRef.close({
            status: 'added',
            client: {
                ...this.form.getRawValue(),
                id: response.id,
            },
        });
    }

    private onSaveClientError(): void {
        this.store.dispatch(
            setWarnSnackbar({
                message: 'Błąd, klient nie został dodany. Spróbuj ponownie za chwilę.',
            })
        );
    }

    private onUpdateClientSuccess(): void {
        this.store.dispatch(setSuccessSnackbar({ message: 'Klient został prawidłowo edytowany' }));

        this.matDialogRef.close({
            status: 'edited',
            client: {
                ...this.form.getRawValue(),
                id: this.client.id,
            },
        });
    }

    private onUpdateClientError(): void {
        this.store.dispatch(
            setWarnSnackbar({
                message: 'Błąd, klient nie został zaktualizowany. Spróbuj ponownie za chwilę.',
            })
        );
    }
}
