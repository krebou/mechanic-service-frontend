import { Component } from '@angular/core';
import { Repair } from '../../../../interface/repair.interface';
import { RepairsService } from '../../../../services/repairs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardHeaderNavi } from '../../../../interface/dashboard-header-navi.interface';
import { Store } from '@ngrx/store';
import { setSuccessSnackbar } from '../../../../store/snackbar/snackbar.actions';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-repair',
    templateUrl: 'repair-info.container.html',
})
export class RepairInfoContainerComponent {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    isSaving = false;

    headerNavi: DashboardHeaderNavi[] = [
        {
            title: 'Lista napraw',
            url: '/dashboard/repairs',
        },
        {
            title: 'Naprawa',
            url: '/dashboard/repairs/add',
        },
    ];

    buttonText = 'Aktualizuj naprawę';

    repair = this.activatedRoute.snapshot.data['repair'] || null;

    /***************  CONSTRUCTOR  ***************/

    constructor(
        private repairsService: RepairsService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private store: Store
    ) {}

    /***************  METHODS   ***************/

    updateRepair(repair: Repair) {
        this.isSaving = true;

        this.repairsService
            .updateRepair({
                ...repair,
                id: this.repair?.id || null,
            })
            .pipe(finalize(() => (this.isSaving = false)))
            .subscribe((res) =>
                this.store.dispatch(
                    setSuccessSnackbar({
                        message: 'Naprawa została zaktualizowana',
                    })
                )
            );
    }
}
