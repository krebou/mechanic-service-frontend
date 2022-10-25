import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../interface/client.interface';
import { catchError, map, of, Subject, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { setSnackbar, setWarnSnackbar } from '../../../store/snackbar/snackbar.actions';
import { Store } from '@ngrx/store';
import { ClientFormDialogComponent } from '../dialogs/client-form-dialog/client-form-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardHeaderNavi } from '../../../interface/dashboard-header-navi.interface';
import { ClientsTableStandaloneComponent } from '../clients-table/clients-table.standalone-component';
import { Subscriptions } from '../../../extends/subscriptions';

@Component({
    selector: 'app-clients-list',
    templateUrl: './clients-list.component.html',
})
export class ClientsListComponent extends Subscriptions implements OnInit, AfterViewInit {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @ViewChild(ClientsTableStandaloneComponent) table!: ClientsTableStandaloneComponent;

    data!: Client[];
    tableResultsLength = 0;

    isLoadingResults = true;

    headerNavi: DashboardHeaderNavi[] = [
        {
            title: 'Lista klientów',
            url: '/dashboard/clients',
        },
    ];

    protected refreshTable$ = new Subject<{ status: string }>();

    /***************  CONSTRUCTOR  ***************/

    constructor(
        private clientsService: ClientsService,
        private dialogService: MatDialog,
        private store: Store,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        super();
    }

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit() {
        /** RESOLVER **/
        this.data = this.activatedRoute.snapshot.data['clients']['data'] || [];
        this.tableResultsLength = this.activatedRoute.snapshot.data['clients']['count'] || 0;
    }

    ngAfterViewInit(): void {
        this.addSubscription = this.refreshTable$
            .pipe(
                switchMap(() => {
                    return this.clientsService
                        .getAllClients(
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
                                            'Pobieranie klientów nie powiodło się - SERVER ERROR',
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
}
