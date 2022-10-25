import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { VehiclesService } from '../../../../services/vehicles.service';
import { Vehicle } from '../../../../interface/vehicle.interface';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-repair-select-vehicle',
    templateUrl: 'repair-select-vehicle.container.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepairSelectVehicleContainerComponent {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @Input() vehicle!: Vehicle | undefined;
    @Output() vehicleChange = new EventEmitter<FormControl>();

    vehicles: Vehicle[] = [];

    /***************  CONSTRUCTOR  ***************/

    constructor(private vehiclesService: VehiclesService) {}

    /***************  METHODS   ***************/

    vehicleChanged(control: FormControl<string | null>) {
        this.vehicleChange.emit(control);
    }

    getVehicles(value: string) {
        this.vehiclesService
            .getAllVehicles(1, 0, 'createdAt', 'desc', {
                plate: {
                    $find: value,
                },
            })
            .subscribe((response) => (this.vehicles = response.data));
    }
}
