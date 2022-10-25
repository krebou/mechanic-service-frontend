import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
    MAT_PAGINATOR_DEFAULT_OPTIONS,
    MatPaginatorDefaultOptions,
} from '@angular/material/paginator';
import { catchError, map, of, Subject, switchMap } from 'rxjs';
import { Vehicle } from '../../../interface/vehicle.interface';
import { VehiclesService } from '../../../services/vehicles.service';
import { MatDialog } from '@angular/material/dialog';
import { VehicleFormDialogComponent } from '../dialogs/vehicle-form-dialog/vehicle-form-dialog.component';
import { Store } from '@ngrx/store';
import { setWarnSnackbar } from '../../../store/snackbar/snackbar.actions';
import { ActivatedRoute } from '@angular/router';
import { VehiclesTableStandaloneComponent } from '../vehicles-table/vehicles-table.standalone-component';
import { DashboardHeaderNavi } from '../../../interface/dashboard-header-navi.interface';
import { Subscriptions } from '../../../extends/subscriptions';

@Component({
    selector: 'app-vehicles-list',
    templateUrl: './vehicles-list.component.html',
})
export class VehiclesListComponent extends Subscriptions implements OnInit {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @ViewChild(VehiclesTableStandaloneComponent) table!: VehiclesTableStandaloneComponent;

    data!: Vehicle[];
    tableResultsLength = 0;

    isLoadingResults = true;

    headerNavi: DashboardHeaderNavi[] = [
        {
            title: 'Lista pojazdów',
            url: '/dashboard/vehicles',
        },
    ];

    protected refreshTable$ = new Subject<{ status: string }>();

    /***************  CONSTRUCTOR  ***************/

    constructor(
        private vehiclesService: VehiclesService,
        private dialogService: MatDialog,
        @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
        matPaginatorDefaultOptions: MatPaginatorDefaultOptions,
        private store: Store<{ snackbar: any }>,
        private activatedRoute: ActivatedRoute
    ) {
        super();
    }

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit() {
        /** RESOLVER **/
        this.data = this.activatedRoute.snapshot.data['vehicles']['data'] || [];
        this.tableResultsLength = this.activatedRoute.snapshot.data['vehicles']['count'] || 0;
    }

    ngAfterViewInit(): void {
        this.addSubscription = this.refreshTable$
            .pipe(
                switchMap(() => {
                    return this.vehiclesService
                        .getAllVehicles(
                            this.table.tablePageIndex,
                            this.table.tablePageSize,
                            this.table.sort.direction,
                            this.table.sort.active
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

                    this.tableResultsLength = response.count;
                    return response.data;
                })
            )
            .subscribe((data) => (this.data = data));
    }

    /***************  METHODS   ***************/

    loadData(): void {
        this.refreshTable$.next({
            status: 'tableChange',
        });
    }

    addVehicle(): void {
        this.dialogService
            .open(VehicleFormDialogComponent, {
                data: { action: 'add' },
            })
            .afterClosed()
            .subscribe({
                next: (response) => {
                    if (response?.status === 'added') {
                        this.refreshTable$.next({
                            status: 'added',
                        });
                    }
                },
            });
    }
}
