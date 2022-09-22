import { Component, Inject } from '@angular/core';
import { Vehicle } from '../../../../interface/vehicle.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehiclesService } from '../../vehicles.service';
import { Store } from '@ngrx/store';
import { setSuccessSnackbar } from '../../../snackbar/store/snackbar.actions';

@Component({
    selector: 'app-vehicle-delete-dialogs',
    templateUrl: './vehicle-delete-dialog.component.html',
    styleUrls: ['./vehicle-delete-dialog.component.scss'],
})
export class VehicleDeleteDialogComponent {
    constructor(
        private vehiclesService: VehiclesService,
        @Inject(MAT_DIALOG_DATA) public dialogData: Vehicle,
        private store: Store,
        private dialogRef: MatDialogRef<VehicleDeleteDialogComponent>
    ) {}

    deleteCar(): void {
        if (this.dialogData.id) {
            this.vehiclesService.deleteVehicle(this.dialogData.id).subscribe({
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
            });
        }
    }
}
