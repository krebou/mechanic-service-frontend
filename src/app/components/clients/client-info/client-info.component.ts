import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../interface/client';
import { ClientDeleteDialogComponent } from '../dialogs/client-delete-dialog/client-delete-dialog.component';
import { setSuccessSnackbar } from '../../snackbar/store/snackbar.actions';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-client-info',
    templateUrl: './client-info.component.html',
    styleUrls: ['./client-info.component.scss'],
})
export class ClientInfoComponent implements AfterViewInit {
    /**
     *   GETTERS / SETTERS / INPUTES / OUTPUTES ETC.
     **/
    @ViewChild('infoTab', { read: ViewContainerRef }) infoTab!: ViewContainerRef;
    @ViewChild('vehiclesTab', { read: ViewContainerRef }) vehiclesTab!: ViewContainerRef;
    @ViewChild('repairsTab', { read: ViewContainerRef }) repairsTab!: ViewContainerRef;

    client!: Client;

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

    /**
     *   CONSTRUCTOR
     **/

    constructor(
        private routeSnapshot: ActivatedRoute,
        private dialogService: MatDialog,
        private router: Router,
        private store: Store
    ) {}

    /**
     *   LIFE-CYCLES COMPONTENT
     **/

    ngOnInit(): void {
        this.client = this.routeSnapshot.snapshot.data['client'];

        this.openTab();
    }

    ngAfterViewInit() {
        this.changedTab(this.tabActive);
    }

    /**
     *   METHODS
     **/

    async getInfoComponent() {
        this.infoTab.clear();
        const { ClientInfoComponent } = await import('./tabs/client-info/client-info.component');
        const _compontent = this.infoTab.createComponent(ClientInfoComponent);
        _compontent.instance.client = this.client;
    }

    async getVehiclesComponent() {
        this.vehiclesTab.clear();
        const { ClientVehiclesComponent } = await import(
            './tabs/client-vehicles/client-vehicles.component'
        );
        const _compontent = this.vehiclesTab.createComponent(ClientVehiclesComponent);
        _compontent.instance.clientId = this.client.id || '';
    }

    async getRepairsComponent() {
        this.repairsTab.clear();
        const { ClientRepairsComponent } = await import(
            './tabs/client-repairs/client-repairs.component'
        );
        const _compontent = this.repairsTab.createComponent(ClientRepairsComponent);
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
            this.tabActive = this.tabs.indexOf(tab) >= 0 ? this.tabs.indexOf(tab) : 0;
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
