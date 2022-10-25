import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../../../interface/vehicle.interface';
import { setSuccessSnackbar } from '../../../store/snackbar/snackbar.actions';
import { MatDialog } from '@angular/material/dialog';
import { VehicleDeleteDialogComponent } from '../dialogs/vehicle-delete-dialog/vehicle-delete-dialog.component';
import { Store } from '@ngrx/store';
import { DashboardHeaderNavi } from '../../../interface/dashboard-header-navi.interface';

@Component({
    selector: 'app-vehicle-info',
    templateUrl: './vehicle-info.component.html',
    styleUrls: ['./vehicle-info.component.scss'],
})
export class VehicleInfoComponent implements OnInit {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @ViewChild('infoTab', { read: ViewContainerRef }) infoTab!: ViewContainerRef;
    @ViewChild('repairsTab', { read: ViewContainerRef }) repairsTab!: ViewContainerRef;

    headerNavi!: DashboardHeaderNavi[];

    vehicle!: Vehicle;

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

    /** TABS **/
    private tabs = [
        {
            slug: 'info',
            loaded: false,
            load: () => this.getInfoComponent(),
        },
        {
            slug: 'repairs',
            loaded: false,
            load: () => this.getRepairsComponent(),
        },
    ];

    /***************  CONSTRUCTOR  ***************/

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dialogService: MatDialog,
        private store: Store
    ) {}

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit(): void {
        this.openTab();

        this.vehicle = this.route.snapshot.data['vehicle'];

        this.headerNavi = [
            {
                title: 'Lista pojazdów',
                url: '/dashboard/vehicles',
            },
            {
                title: 'Pojazd',
                url: `/dashboard/vehicles/info/${this.vehicle.id}`,
            },
        ];
    }

    ngAfterViewInit() {
        this.changedTab(this.tabActive);
    }

    /***************  METHODS   ***************/

    async getInfoComponent() {
        this.infoTab.clear();
        const { VehicleInfoStandaloneComponent } = await import(
            './tabs/vehicle-info/vehicle-info.standalone-component'
        );
        const _compontent = this.infoTab.createComponent(VehicleInfoStandaloneComponent);
        _compontent.instance.vehicle = this.vehicle;
    }

    async getRepairsComponent() {
        this.repairsTab.clear();
        const { VehicleRepairsStandaloneComponent } = await import(
            './tabs/vehicle-repairs/vehicle-repairs.standalone-component'
        );
        const _compontent = this.repairsTab.createComponent(VehicleRepairsStandaloneComponent);
        _compontent.instance.vehicleId = this.vehicle.id || '';
    }

    changedTab(index: number) {
        if (this.tabs[index]?.loaded === false) {
            this.tabs[index].load();
            this.tabs[index].loaded = true;
        }
    }

    openTab(): void {
        if (this.route.snapshot.queryParamMap.has('tab')) {
            const tab = this.route.snapshot.queryParams['tab'];
            this.tabs.forEach((value, index) => {
                if (value.slug === tab) {
                    this.tabActive = index;
                }
            });
        }
    }

    deleteVehicle(): void {
        this.dialogService
            .open(VehicleDeleteDialogComponent, {
                data: this.vehicle,
                maxWidth: '600px',
            })
            .afterClosed()
            .subscribe({
                next: (result) => {
                    if (result?.status === 'deleted') {
                        this.store.dispatch(
                            setSuccessSnackbar({ message: 'Pojazd został usunięty prawidłowo!' })
                        );

                        this.router.navigate(['/dashboard', 'vehicles']);
                    }
                },
            });
    }
}
