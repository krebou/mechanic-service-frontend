import {
    AfterViewInit,
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
import { CommonModule } from '@angular/common';
import { Client } from '../../../interface/client.interface';
import { Table } from '../../../extends/table';
import {
    MAT_PAGINATOR_DEFAULT_OPTIONS,
    MatPaginator,
    MatPaginatorDefaultOptions,
} from '@angular/material/paginator';
import { ActionButtonStandaloneComponent } from '../../action-button/action-button.standalone-component';
import {
    MatFormModule,
    MatTablePacksetModule,
} from '../../../modules/angular-material/angular-material.module';
import { MatSort } from '@angular/material/sort';
import { map, mergeWith, Subscription } from 'rxjs';
import { ClientsService } from '../../../services/clients.service';
import { isPageEvent } from '../../../helpers/helpers';
import { ClientDeleteDialogComponent } from '../dialogs/client-delete-dialog/client-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { ClientsSelectActionDialogComponent } from '../dialogs/clients-select-action-dialog/clients-select-action-dialog.component';
import { ActionButtonMenuInterface } from '../../../interface/action-button-menu.interface';
import { ACTION_BUTTON_MENU } from '../../../injectionTokens/action-button-menu.injection-token';
import { BeforeTableStandaloneComponent } from '../../before-table/before-table.standalone-component';
import { FeatherIconStandaloneComponent } from '../../feather-icon/feather-icon.standalone-component';

const ACTION_MENU: ActionButtonMenuInterface[] = [
    { action: 'edit', button: 'EDYTUJ' },
    { action: 'vehicles', button: 'POJAZDY' },
    { action: 'repairs', button: 'NAPRAWY' },
    { action: 'delete', button: 'USUŃ' },
];

@Component({
    selector: 'app-clients-table',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FeatherIconStandaloneComponent,
        BeforeTableStandaloneComponent,
        ActionButtonStandaloneComponent,
        MatTablePacksetModule,
        MatFormModule,
    ],
    templateUrl: './clients-table.standalone-component.html',
    styleUrls: ['./clients-table.standalone-component.scss'],
    providers: [
        {
            provide: ACTION_BUTTON_MENU,
            useValue: ACTION_MENU,
        },
    ],
})
export class ClientsTableStandaloneComponent
    extends Table<Client>
    implements OnInit, AfterViewInit, OnDestroy
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

    @Input() set clients(clients: Client[]) {
        this.data = clients;
    }
    get clients(): Client[] {
        return this.data;
    }

    private sort$!: Subscription;

    /***************  CONSTRUCTOR  ***************/
    constructor(
        @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
        matPaginatorDefaultOptions: MatPaginatorDefaultOptions,
        private clientsService: ClientsService,
        private dialogService: MatDialog,
        private router: Router
    ) {
        super(matPaginatorDefaultOptions);
    }

    /***************  LIFE-CYCLES COMPONENT   ***************/
    ngOnInit(): void {
        this.displayedColumns = ['select', 'name', 'phone', 'email', 'createdAt', 'type', 'action'];
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

    onMenuAction(name: string, client: Client): void {
        if (name === 'delete') this.deleteClient(client);
        if (name === 'edit') this.router.navigate(['dashboard', 'clients', 'info', client.id]);
        if (name === 'vehicles')
            this.router.navigate(['dashboard', 'clients', 'info', client.id], {
                queryParamsHandling: 'merge',
                queryParams: {
                    tab: 'vehicles',
                },
            });
        if (name === 'repairs')
            this.router.navigate(['dashboard', 'clients', 'info', client.id], {
                queryParamsHandling: 'merge',
                queryParams: {
                    tab: 'repairs',
                },
            });
    }

    private deleteClient(client: Client): void {
        this.dialogService
            .open(ClientDeleteDialogComponent, {
                data: client,
                maxWidth: '600px',
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

    /** TABLE MULTI SELECTED ROWS ACTION **/
    selectedAction(name: string): void {
        this.dialogService
            .open(ClientsSelectActionDialogComponent, {
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
}
