import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../interface/client.interface';
import { ClientDeleteDialogComponent } from '../dialogs/client-delete-dialog/client-delete-dialog.component';
import { setSuccessSnackbar } from '../../../store/snackbar/snackbar.actions';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DashboardHeaderNavi } from '../../../interface/dashboard-header-navi.interface';

@Component({
    selector: 'app-client-info',
    templateUrl: './client-info.component.html',
    styleUrls: ['./client-info.component.scss'],
})
export class ClientInfoComponent implements AfterViewInit {
    /**  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.   **/
    @ViewChild('infoTab', { read: ViewContainerRef }) infoTab!: ViewContainerRef;
    @ViewChild('vehiclesTab', { read: ViewContainerRef }) vehiclesTab!: ViewContainerRef;
    @ViewChild('repairsTab', { read: ViewContainerRef }) repairsTab!: ViewContainerRef;

    client!: Client;

    headerNavi!: DashboardHeaderNavi[];

    /** TABS **/
    private tabs = [
        {
            slug: 'info',
            loaded: false,
            load: () => this.getInfoComponent(),
        },
        {
            slug: 'vehicles',
            loaded: false,
            load: () => this.getVehiclesComponent(),
        },
        {
            slug: 'repairs',
            loaded: false,
            load: () => this.getRepairsComponent(),
        },
    ];
    private _tabActive = 0;
    get tabActive(): number {
        return this._tabActive;
    }
    set tabActive(index: number) {
        this._tabActive = index;

        this.router.navigate([], {
            queryParamsHandling: 'merge',
            queryParams: {
                tab: this.tabs[index].slug,
            },
        });
    }

    /***************  CONSTRUCTOR  ***************/
    constructor(
        private routeSnapshot: ActivatedRoute,
        private dialogService: MatDialog,
        private router: Router,
        private store: Store
    ) {}

    /** LIFE-CYCLES COMPONTENT **/
    ngOnInit(): void {
        this.client = this.routeSnapshot.snapshot.data['client'];

        this.openTab();

        this.headerNavi = [
            {
                title: 'Lista klientów',
                url: '/dashboard/clients',
            },
            {
                title: 'Klient',
                url: `/dashboard/clients/info/${this.client.id}`,
            },
        ];
    }

    ngAfterViewInit() {
        this.changedTab(this.tabActive);
    }

    /***************  METHODS   ***************/
    async getInfoComponent() {
        this.infoTab.clear();
        const { ClientInfoStandaloneComponent } = await import(
            './tabs/client-info/client-info.standalone-component'
        );
        const _compontent = this.infoTab.createComponent(ClientInfoStandaloneComponent);
        _compontent.instance.client = this.client;
    }

    async getVehiclesComponent() {
        this.vehiclesTab.clear();
        const { ClientVehiclesStandaloneComponent } = await import(
            './tabs/client-vehicles/client-vehicles.standalone-component'
        );
        const _compontent = this.vehiclesTab.createComponent(ClientVehiclesStandaloneComponent);
        _compontent.instance.clientId = this.client.id || '';
    }

    async getRepairsComponent() {
        this.repairsTab.clear();
        const { ClientRepairsStandaloneComponent } = await import(
            './tabs/client-repairs/client-repairs.standalone-component'
        );
        const _compontent = this.repairsTab.createComponent(ClientRepairsStandaloneComponent);
        _compontent.instance.clientId = this.client.id || '';
    }

    changedTab(index: number) {
        if (this.tabs[index]?.loaded === false) {
            this.tabs[index].load();
            this.tabs[index].loaded = true;
        }
    }

    openTab(): void {
        if (this.routeSnapshot.snapshot.queryParamMap.has('tab')) {
            const tab = this.routeSnapshot.snapshot.queryParams['tab'];
            this.tabs.forEach((value, index) => {
                if (value.slug === tab) {
                    this.tabActive = index;
                }
            });
        }
    }

    deleteClient(): void {
        this.dialogService
            .open(ClientDeleteDialogComponent, {
                data: this.client,
                maxWidth: '600px',
            })
            .afterClosed()
            .subscribe({
                next: (result) => {
                    if (result?.status === 'deleted') {
                        this.store.dispatch(
                            setSuccessSnackbar({ message: 'Klient został usunięty prawidłowo!' })
                        );

                        this.router.navigate(['/dashboard', 'clients']);
                    }
                },
            });
    }
}
