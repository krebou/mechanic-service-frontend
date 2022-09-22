import {
    AfterViewInit,
    Component,
    Inject,
    OnInit,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../interface/client';
import { catchError, finalize, first, map, mergeWith, of, startWith, switchMap } from 'rxjs';
import {
    MAT_PAGINATOR_DEFAULT_OPTIONS,
    MatPaginator,
    MatPaginatorDefaultOptions,
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { isPageEvent } from '../../../helpers/helpers';
import { setSnackbar, setWarnSnackbar } from '../../snackbar/store/snackbar.actions';
import { Store } from '@ngrx/store';
import { ClientFormDialogComponent } from '../dialogs/client-form-dialog/client-form-dialog.component';
import { ClientDeleteDialogComponent } from '../dialogs/client-delete-dialog/client-delete-dialog.component';
import { ACTION_BUTTON_MENU, BUTTON_MENU } from '../../action-button/action-button.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from '../../../extends/table';
import { ClientsSelectActionDialogComponent } from '../dialogs/clients-select-action-dialog/clients-select-action-dialog.component';

const ACTION_MENU: BUTTON_MENU[] = [
    { action: 'edit', button: 'EDYTUJ' },
    { action: 'vehicles', button: 'POJAZDY' },
    { action: 'repairs', button: 'NAPRAWY' },
    { action: 'delete', button: 'USUŃ' },
];

@Component({
    selector: 'app-clients-list',
    templateUrl: './clients-list.component.html',
    styleUrls: ['./clients-list.component.scss'],
    providers: [
        {
            provide: ACTION_BUTTON_MENU,
            useValue: ACTION_MENU,
        },
    ],
})
export class ClientsListComponent extends Table<Client> implements OnInit, AfterViewInit {
    /**
     *   GETTERS / SETTERS / INPUTES / OUTPUTES ETC.
     **/
    @ViewChildren(MatPaginator) paginator!: QueryList<MatPaginator>;
    @ViewChild(MatSort) sort!: MatSort;

    isLoadingResults = true;

    /**
     *   CONSTRUCTOR
     **/

    constructor(
        private clientsService: ClientsService,
        private dialogService: MatDialog,
        private store: Store,
        @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
        matPaginatorDefaultOptions: MatPaginatorDefaultOptions,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        super(matPaginatorDefaultOptions);
    }

    /**
     *   LIFE-CYCLES COMPONTENT
     **/

    ngOnInit() {
        this.displayedColumns = ['select', 'name', 'phone', 'email', 'createdAt', 'type', 'action'];

        /** RESOLVER **/
        this.data = this.activatedRoute.snapshot.data['clients']['data'] || [];
        this.tableResultsLength = this.activatedRoute.snapshot.data['clients']['count'] || 0;
    }

    ngAfterViewInit(): void {
        this.paginatorArray = this.paginator.toArray();
        this.paginatorTop = this.paginatorArray[0];
        this.paginatorBottom = this.paginatorArray[1];

        this.sort.sortChange
            .pipe(
                mergeWith(this.paginatorTop.page, this.paginatorBottom.page, this.refreshTable$),
                switchMap((event) => {
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

                    this.isLoadingResults = true;

                    return this.clientsService
                        .getAllClients(
                            this.tablePageIndex,
                            this.tablePageSize,
                            this.sort.active,
                            this.sort.direction
                        )
                        .pipe(
                            catchError(() => {
                                this.store.dispatch(
                                    setWarnSnackbar({
                                        message:
                                            'Pobieranie klientów nie powiodło się - SERVER ERROR',
                                    })
                                );
                                return of(null);
                            })
                        );
                }),
                map((response): Client[] => {
                    this.isLoadingResults = false;

                    if (response === null) {
                        return [];
                    }

                    this.tableResultsLength = response.count;
                    return response.data;
                })
            )
            .subscribe((clients: Client[]) => (this.data = clients));
    }

    /**
     *   METHODS
     **/

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

    /**  CLIENT ACTIONS  **/

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

    addClient(): void {
        this.dialogService
            .open(ClientFormDialogComponent, {
                data: { action: 'add' },
            })
            .afterClosed()
            .subscribe({
                next: (result) => {
                    if (result?.status === 'added') {
                        this.store.dispatch(
                            setSnackbar({
                                payload: {
                                    color: 'success',
                                    message: 'Klient został dodany prawidłowo!',
                                },
                            })
                        );

                        this.refreshTable$.next({
                            status: 'added',
                        });
                    }
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
}
