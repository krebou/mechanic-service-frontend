import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, forkJoin, map, of } from 'rxjs';
import { ClientsService } from '../../../../services/clients.service';
import { Store } from '@ngrx/store';
import { setSnackbar } from '../../../../store/snackbar/snackbar.actions';

@Component({
    selector: 'app-clients-select-action-dialogs',
    templateUrl: './clients-select-action-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsSelectActionDialogComponent {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    count = this.dialogData.selected.length;

    /***************  CONSTRUCTOR  ***************/

    constructor(
        @Inject(MAT_DIALOG_DATA) private dialogData: { action: string; selected: string[] },
        private dialogRef: MatDialogRef<ClientsSelectActionDialogComponent>,
        private clientsService: ClientsService,
        private store: Store
    ) {}

    /***************  METHODS   ***************/

    makeAction(): void {
        const selection = this.dialogData.selected.map((value) =>
            this.clientsService.deleteClient(value).pipe(catchError(() => of({ deleted: false })))
        );

        forkJoin(selection)
            .pipe(
                map((res) => {
                    return res.filter((responose) => responose.deleted);
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
