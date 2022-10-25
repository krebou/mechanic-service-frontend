import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { Table } from '../../../extends/table';
import {
    MAT_PAGINATOR_DEFAULT_OPTIONS,
    MatPaginator,
    MatPaginatorDefaultOptions,
    MatPaginatorIntl,
} from '@angular/material/paginator';
import { Vehicle } from '../../../interface/vehicle.interface';
import { MatSort } from '@angular/material/sort';
import { map, mergeWith, Subscription } from 'rxjs';
import { isPageEvent } from '../../../helpers/helpers';
import { VehiclesService } from '../../../services/vehicles.service';
import { Store } from '@ngrx/store';
import { VehiclesSelectActionDialogComponent } from '../dialogs/vehicles-select-action-dialog/vehicles-select-action-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { VehicleDeleteDialogComponent } from '../dialogs/vehicle-delete-dialog/vehicle-delete-dialog.component';
import { Router, RouterModule } from '@angular/router';
import { MatPaginatorSettings } from '../../../modules/angular-material/matPaginator/matPaginator.settings';
import { CommonModule } from '@angular/common';
import {
    MatFormModule,
    MatTablePacksetModule,
} from '../../../modules/angular-material/angular-material.module';
import { BeforeTableStandaloneComponent } from '../../before-table/before-table.standalone-component';
import { ActionButtonStandaloneComponent } from '../../action-button/action-button.standalone-component';
import { PipesModule } from '../../../pipes/pipes.module';

const matPaginatorIntl = new MatPaginatorSettings().matPaginatorIntl();
matPaginatorIntl.itemsPerPageLabel = 'Pojazdów na stronie: ';

@Component({
    selector: 'app-vehicles-table',
    templateUrl: './vehicles-table.standalone-component.html',
    styleUrls: ['./vehicles-table.standalone-component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        BeforeTableStandaloneComponent,
        ActionButtonStandaloneComponent,
        PipesModule,
        MatTablePacksetModule,
        MatFormModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: MatPaginatorIntl,
            useValue: matPaginatorIntl,
        },
    ],
})
export class VehiclesTableStandaloneComponent
    extends Table<Vehicle>
    implements OnInit, OnDestroy, AfterViewInit
{
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @ViewChildren(MatPaginator) paginator!: QueryList<MatPaginator>;
    @ViewChild(MatSort) sort!: MatSort;

    @Output() private tableChange = new EventEmitter<{
        page: number;
        pageSize: number;
        sort: string;
        sortDirection: string;
    }>();

    @Input() set vehicles(vehicles: Vehicle[]) {
        this.data = vehicles;
    }
    get vehicles(): Vehicle[] {
        return this.data;
    }

    private sort$!: Subscription;

    /***************  CONSTRUCTOR  ***************/

    constructor(
        @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
        matPaginatorDefaultOptions: MatPaginatorDefaultOptions,
        private vehiclesService: VehiclesService,
        private store: Store,
        private dialogService: MatDialog,
        private router: Router
    ) {
        super(matPaginatorDefaultOptions);
    }

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit(): void {
        /** Table Settings **/
        this.displayedColumns = [
            'select',
            'plate',
            'mark',
            'model',
            'year',
            'engine',
            'createdAt',
            'action',
        ];
    }

    ngAfterViewInit(): void {
        this.paginatorArray = this.paginator.toArray();
        this.paginatorTop = this.paginatorArray[0];
        this.paginatorBottom = this.paginatorArray[1];

        this.sort$ = this.sort.sortChange
            .pipe(
                mergeWith(this.paginatorTop.page, this.paginatorBottom.page, this.refreshTable$),
                map((event) => {
                    // If detected paginator page changes
                    if (isPageEvent(event)) {
                        this.tablePageIndex = event.pageIndex;
                        this.tablePageSize = event.pageSize;
                    }

                    // If the user changes the sort order, delete or add object, reset back to the first page.
                    if (event.hasOwnProperty('direction') || event.hasOwnProperty('status')) {
                        this.tablePageIndex = 0;
                    }

                    // UNCHECK CHECKBOXES
                    this.clearSelected();

                    return {
                        page: this.tablePageIndex,
                        pageSize: this.tablePageSize,
                        sort: this.sort.active,
                        sortDirection: this.sort.direction,
                    };
                })
            )
            .subscribe((tableInfo) => this.tableChange.emit(tableInfo));
    }

    ngOnDestroy(): void {
        this.sort$.unsubscribe();
    }

    /***************  METHODS   ***************/

    /** TABLE MULTI SELECTED ROWS ACTION **/
    onMenuAction(name: string, vehicle: Vehicle): void {
        if (name === 'delete') this.deleteVehicle(vehicle);
        if (name === 'edit') this.router.navigate(['/dashboard', 'vehicles', 'info', vehicle.id]);
    }

    selectedAction(name: string): void {
        this.dialogService
            .open(VehiclesSelectActionDialogComponent, {
                maxWidth: '600px',
                data: {
                    action: name,
                    selected: this.selection.selected,
                },
            })
            .afterClosed()
            .subscribe({
                next: (response) => {
                    if (response?.action) {
                        this.refreshTable$.next({
                            status: 'deleted',
                        });
                        this.clearSelected();
                    }
                },
            });
    }

    deleteVehicle(vehicle: Vehicle): void {
        this.dialogService
            .open(VehicleDeleteDialogComponent, {
                data: vehicle,
            })
            .afterClosed()
            .subscribe({
                next: (response) => {
                    if (response?.status === 'deleted') {
                        this.refreshTable$.next({
                            status: 'deleted',
                        });
                    }
                },
            });
    }
}
