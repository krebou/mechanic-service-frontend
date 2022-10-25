import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { setSuccessSnackbar, setWarnSnackbar } from '../../../../store/snackbar/snackbar.actions';
import { ClientsService } from '../../../../services/clients.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../interface/client.interface';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-client-info-delete-dialogs',
    templateUrl: './client-delete-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDeleteDialogComponent {
    /***************  CONSTRUCTOR  ***************/

    constructor(
        private clientService: ClientsService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public dialogData: Client,
        private store: Store,
        private dialogRef: MatDialogRef<ClientDeleteDialogComponent>
    ) {}

    /***************  METHODS   ***************/

    deleteClient(): void {
        if (this.dialogData.id) {
            this.clientService.deleteClient(this.dialogData.id).subscribe({
                next: () => {
                    this.store.dispatch(
                        setSuccessSnackbar({
                            message: 'Pojazd został usunięty prawidłowo.',
                        })
                    );
                    this.dialogRef.close({
                        status: 'deleted',
                    });
                },
                error: (error) => {
                    this.store.dispatch(
                        setWarnSnackbar({
                            message:
                                error.status === 404
                                    ? 'Klient nie istnieje!'
                                    : 'Błąd! Spróbuj ponownie później!',
                        })
                    );
                    this.dialogRef.close();
                },
            });
        }
    }
}
