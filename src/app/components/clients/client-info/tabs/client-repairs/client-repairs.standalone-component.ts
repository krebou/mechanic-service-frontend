import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { setWarnSnackbar } from '../../../../../store/snackbar/snackbar.actions';
import { Repair } from '../../../../../interface/repair.interface';
import { RepairsService } from '../../../../../services/repairs.service';
import { RepairsTableStandaloneComponent } from '../../../../repairs/components/repairs-table/repairs-table.standalone-component';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '../../../../../modules/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { Subscriptions } from '../../../../../extends/subscriptions';

@Component({
    selector: 'app-client-info-repairs-list',
    templateUrl: './client-repairs.standalone-component.html',
    standalone: true,
    imports: [CommonModule, RepairsTableStandaloneComponent, MatProgressSpinnerModule],
})
export class ClientRepairsStandaloneComponent extends Subscriptions implements AfterViewInit {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @Input() public clientId!: string;

    /** REPAIRS TAB **/
    repairs!: Repair[];
    isLoadingRepairs = true;
    private refreshTableRepairs$ = new Subject<{ status: string }>();
    @ViewChild(RepairsTableStandaloneComponent) table!: RepairsTableStandaloneComponent;

    /***************  CONSTRUCTOR  ***************/

    constructor(private repairsService: RepairsService, private store: Store) {
        super();
    }

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngAfterViewInit(): void {
        this.getAllRepairs();
    }

    /***************  METHODS   ***************/

    loadRepairsData(): void {
        this.refreshTableRepairs$.next({
            status: 'tableChange',
        });
    }

    getAllRepairs(): void {
        this.addSubscription = this.refreshTableRepairs$
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.repairsService
                        .getAllRepairs(
                            this.table.tablePageIndex,
                            this.table.tablePageSize,
                            this.table.sort.direction,
                            this.table.sort.active,
                            { clientId: this.clientId }
                        )
                        .pipe(
                            catchError(() => {
                                this.store.dispatch(
                                    setWarnSnackbar({
                                        message:
                                            'Pobieranie napraw nie powiodło się - SERVER ERROR',
                                    })
                                );
                                return of(null);
                            })
                        );
                }),
                map((response) => {
                    if (response === null) return [];

                    this.isLoadingRepairs = false;

                    return response.data;
                })
            )
            .subscribe((repairs) => (this.repairs = repairs));
    }
}
