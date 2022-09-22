import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
    MAT_PAGINATOR_DEFAULT_OPTIONS,
    MatPaginatorDefaultOptions,
} from '@angular/material/paginator';
import { catchError, map, of, Subject, switchMap } from 'rxjs';
import { Vehicle } from '../../../interface/vehicle.interface';
import { VehiclesService } from '../vehicles.service';
import { MatDialog } from '@angular/material/dialog';
import { VehicleFormDialogComponent } from '../vehicle-form-dialog/vehicle-form-dialog.component';
import { Store } from '@ngrx/store';
import { setWarnSnackbar } from '../../snackbar/store/snackbar.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesTableComponent } from '../vehicles-table/vehicles-table.component';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
    @ViewChild(VehiclesTableComponent) table!: VehiclesTableComponent;

    data!: Vehicle[];
    tableResultsLength = 0;

    isLoadingResults = true;

    protected refreshTable$ = new Subject<{ status: string }>();

    constructor(
        private vehiclesService: VehiclesService,
        private dialogService: MatDialog,
        @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
        matPaginatorDefaultOptions: MatPaginatorDefaultOptions,
        private store: Store<{ snackbar: any }>,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        /** RESOLVER **/
        this.data = this.activatedRoute.snapshot.data['vehicles']['data'] || [];
        this.tableResultsLength = this.activatedRoute.snapshot.data['vehicles']['count'] || 0;
    }

    ngAfterViewInit(): void {
        this.refreshTable$
            .pipe(
                switchMap(() => {
                    return this.vehiclesService
                        .getAllVehicles(
                            this.table.tablePageIndex,
                            this.table.tablePageSize,
                            this.table.sort.active,
                            this.table.sort.direction
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
