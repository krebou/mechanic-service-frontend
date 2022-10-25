import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscriptions } from '../../../../../extends/subscriptions';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { setWarnSnackbar } from '../../../../../store/snackbar/snackbar.actions';
import { Vehicle } from '../../../../../interface/vehicle.interface';
import { VehiclesTableStandaloneComponent } from '../../../../vehicles/vehicles-table/vehicles-table.standalone-component';
import { VehiclesService } from '../../../../../services/vehicles.service';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '../../../../../modules/angular-material/angular-material.module';

@Component({
    selector: 'app-client-info-vehicles-list',
    standalone: true,
    imports: [CommonModule, VehiclesTableStandaloneComponent, MatProgressSpinnerModule],
    templateUrl: './client-vehicles.standalone-component.html',
})
export class ClientVehiclesStandaloneComponent extends Subscriptions implements AfterViewInit {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/
    @Input() public clientId?: string;

    /** VEHICLES TAB **/
    vehicles!: Vehicle[];
    isLoadingVehlices = true;
    private refreshTableVehicle$ = new Subject<{ status: string }>();
    @ViewChild(VehiclesTableStandaloneComponent) table!: VehiclesTableStandaloneComponent;

    /***************  CONSTRUCTOR  ***************/
    constructor(private vehiclesService: VehiclesService, private store: Store) {
        super();
    }

    /***************  LIFE-CYCLES COMPONENT   ***************/
    ngAfterViewInit(): void {
        this.getAllVehicles();
    }

    /***************  METHODS   ***************/

    loadVehicleData(): void {
        this.refreshTableVehicle$.next({
            status: 'tableChange',
        });
    }

    getAllVehicles(): void {
        this.addSubscription = this.refreshTableVehicle$
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.vehiclesService
                        .getAllVehicles(
                            this.table.tablePageIndex,
                            this.table.tablePageSize,
                            this.table.sort.active,
                            this.table.sort.direction,
                            { clientId: this.clientId }
                        )
                        .pipe(
                            catchError(() => {
                                this.store.dispatch(
                                    setWarnSnackbar({
                                        message:
                                            'Pobieranie pojazdów nie powiodło się - SERVER ERROR',
                                    })
                                );
                                return of(null);
                            })
                        );
                }),
                map((response) => {
                    if (response === null) return [];

                    this.isLoadingVehlices = false;

                    return response.data;
                })
            )
            .subscribe((vehicles) => (this.vehicles = vehicles));
    }
}
