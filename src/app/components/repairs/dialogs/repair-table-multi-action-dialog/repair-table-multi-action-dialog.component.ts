import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { RepairsService } from '../../../../services/repairs.service';
import { catchError, forkJoin, map, of } from 'rxjs';
import { setSnackbar } from '../../../../store/snackbar/snackbar.actions';

@Component({
    selector: 'app-repair-table-multi-action-dialog',
    templateUrl: './repair-table-multi-action-dialog.component.html',
})
export class RepairTableMultiActionDialogComponent {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    count = this.dialogData.selected.length;

    /***************  CONSTRUCTOR  ***************/

    constructor(
        @Inject(MAT_DIALOG_DATA) private dialogData: { action: string; selected: string[] },
        private dialogRef: MatDialogRef<RepairTableMultiActionDialogComponent>,
        private store: Store,
        private repairsService: RepairsService
    ) {}

    /***************  METHODS   ***************/

    makeAction(): void {
        const selection = this.dialogData.selected.map((value) =>
            this.repairsService.deleteRepair(value).pipe(catchError(() => of({ deleted: false })))
        );

        forkJoin(selection)
            .pipe(
                map((res) => {
                    return res.filter((data) => data.deleted);
                })
            )
            .subscribe({
                next: (response) => {
                    const isAllSuccess = response.length === this.dialogData.selected.length;
                    this.store.dispatch(
                        setSnackbar({
                            payload: {
                                color: isAllSuccess ? 'success' : 'warn',
                                message: isAllSuccess
                                    ? 'Akcja wykonana prawidłowo!'
                                    : 'Nie wszystko poszło zgodnie z planem!',
                            },
                        })
                    );
                    this.dialogRef.close({ action: this.dialogData.action });
                },
            });
    }
}
