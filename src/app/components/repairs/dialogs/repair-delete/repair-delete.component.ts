import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../../../interface/client';
import { Store } from '@ngrx/store';
import { RepairsService } from '../../../../services/repairs.service';
import { setSuccessSnackbar, setWarnSnackbar } from '../../../snackbar/store/snackbar.actions';

@Component({
    selector: 'app-repair-delete',
    templateUrl: './repair-delete.component.html',
    styleUrls: ['./repair-delete.component.scss'],
})
export class RepairDeleteComponent {
    constructor(
        private repairsService: RepairsService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public dialogData: Client,
        private store: Store,
        private dialogRef: MatDialogRef<RepairDeleteComponent>
    ) {}

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
