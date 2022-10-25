import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../interface/client.interface';
import { Store } from '@ngrx/store';
import { RepairsService } from '../../../../services/repairs.service';
import { setSuccessSnackbar, setWarnSnackbar } from '../../../../store/snackbar/snackbar.actions';

@Component({
    selector: 'app-repair-delete',
    templateUrl: './repair-delete.component.html',
})
export class RepairDeleteComponent {
    /***************  CONSTRUCTOR  ***************/

    constructor(
        private repairsService: RepairsService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public dialogData: Client,
        private store: Store,
        private dialogRef: MatDialogRef<RepairDeleteComponent>
    ) {}

    /***************  METHODS   ***************/

    deleteRepair(): void {
        if (this.dialogData.id) {
            this.repairsService.deleteRepair(this.dialogData.id).subscribe({
                next: () => {
                    this.store.dispatch(
                        setSuccessSnackbar({
                            message: 'Naprawa została usunięta prawidłowo.',
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
                                    ? 'Naprawa nie istnieje!'
                                    : 'Błąd! Spróbuj ponownie później!',
                        })
                    );
                    this.dialogRef.close();
                },
            });
        }
    }
}
