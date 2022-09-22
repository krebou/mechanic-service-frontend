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
import { Repair } from '../../../interface/repair.interface';
import {
    MAT_PAGINATOR_DEFAULT_OPTIONS,
    MatPaginator,
    MatPaginatorDefaultOptions,
} from '@angular/material/paginator';
import { map, mergeWith, Subscription } from 'rxjs';
import { isPageEvent } from '../../../helpers/helpers';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { BeforeTableComponent } from '../../before-table/before-table.component';
import {
    MatFormModule,
    MatTablePacksetModule,
} from '../../../modules/angular-material/angular-material.module';
import {
    ACTION_BUTTON_MENU,
    ActionButtonComponent,
    BUTTON_MENU,
} from '../../action-button/action-button.component';
import { PipesModule } from '../../../pipes/pipes.module';
import { MatDialog } from '@angular/material/dialog';
import { RepairDeleteComponent } from '../dialogs/repair-delete/repair-delete.component';
import { RepairTableMultiActionDialogComponent } from '../dialogs/repair-table-multi-action-dialog/repair-table-multi-action-dialog.component';
import { Router, RouterModule } from '@angular/router';

const ACTION_MENU: BUTTON_MENU[] = [
    {
        action: 'edit',
        button: 'Edytuj',
    },
    {
        action: 'viewVehicle',
        button: 'Zobacz pojazd',
    },
    {
        action: 'viewClient',
        button: 'Zobacz klienta',
    },
    {
        action: 'delete',
        button: 'Usuń',
    },
];

@Component({
    selector: 'app-repairs-table',
    templateUrl: './repairs-table.component.html',
    styleUrls: ['./repairs-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        BeforeTableComponent,
        ActionButtonComponent,
        PipesModule,
        MatTablePacksetModule,
        MatFormModule,
    ],
    providers: [
        {
            provide: ACTION_BUTTON_MENU,
            useValue: ACTION_MENU,
        },
    ],
})
export class RepairsTableComponent
    extends Table<Repair>
    implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChildren(MatPaginator) paginator!: QueryList<MatPaginator>;
    @ViewChild(MatSort) sort!: MatSort;

    @Output() private tableChange = new EventEmitter<{
        page: number;
        pageSize: number;
        sort: string;
        sortDirection: string;
    }>();

    @Input() set repairs(repairs: Repair[]) {
        this.data = repairs;
    }
    get repairs(): Repair[] {
        return this.data;
    }

    private sort$!: Subscription;

    constructor(
        @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
        matPaginatorDefaultOptions: MatPaginatorDefaultOptions,
        private dialogService: MatDialog,
        private router: Router
    ) {
        super(matPaginatorDefaultOptions);
    }

    ngOnInit(): void {
        /** Table Settings **/
        this.displayedColumns = ['select', 'id', 'plate', 'type', 'status', 'createdAt', 'action'];
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

    /**  REPAIR ACTIONS  **/

    onMenuAction(name: string, repair: Repair): void {
        if (name === 'delete') this.deleteRepair(repair);
        if (name === 'edit') this.router.navigate(['/dashboard', 'repairs', 'info', repair.id]);
        if (name === 'viewVehicle')
            this.router.navigate(['/dashboard', 'vehicles', 'info', repair.vehicle?.id]);
        if (name === 'viewClient')
            this.router.navigate(['/dashboard', 'clients', 'info', repair.vehicle?.clientId]);
    }

    private deleteRepair(repair: Repair): void {
        this.dialogService
            .open(RepairDeleteComponent, {
                data: repair,
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

    selectedAction(name: string): void {
        this.dialogService
            .open(RepairTableMultiActionDialogComponent, {
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

    ngOnDestroy(): void {
        this.sort$.unsubscribe();
    }
}
