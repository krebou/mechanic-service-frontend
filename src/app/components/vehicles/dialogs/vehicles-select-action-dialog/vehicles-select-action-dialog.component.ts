import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, forkJoin, map, of } from 'rxjs';
import { setSnackbar } from '../../../snackbar/store/snackbar.actions';
import { VehiclesService } from '../../vehicles.service';

@Component({
    selector: 'app-vehicles-select-action-dialog',
    templateUrl: './vehicles-select-action-dialog.component.html',
    styleUrls: ['./vehicles-select-action-dialog.component.scss'],
})
export class VehiclesSelectActionDialogComponent {
    count = this.dialogData.selected.length;

    constructor(
        @Inject(MAT_DIALOG_DATA) private dialogData: { action: string; selected: string[] },
        private dialogRef: MatDialogRef<VehiclesSelectActionDialogComponent>,
        private vehiclesService: VehiclesService,
        private store: Store
    ) {}

    makeAction(): void {
        const selection = this.dialogData.selected.map((value) =>
            this.vehiclesService.deleteVehicle(value).pipe(catchError(() => of({ deleted: false })))
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
