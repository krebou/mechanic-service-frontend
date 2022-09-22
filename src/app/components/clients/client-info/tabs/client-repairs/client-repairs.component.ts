import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { setWarnSnackbar } from '../../../../snackbar/store/snackbar.actions';
import { Repair } from '../../../../../interface/repair.interface';
import { RepairsService } from '../../../../../services/repairs.service';
import { RepairsTableComponent } from '../../../../repairs/repairs-table/repairs-table.component';
import { Store } from '@ngrx/store';
import { MatProgressSpinnerModule } from '../../../../../modules/angular-material/angular-material.module';
import { CommonModule } from '@angular/common';
import { Subscriptions } from '../../../../../extends/Subscriptions';

@Component({
    selector: 'app-client-info-repairs',
    templateUrl: './client-repairs.component.html',
    styleUrls: ['./client-repairs.component.scss'],
    standalone: true,
    imports: [CommonModule, RepairsTableComponent, MatProgressSpinnerModule],
})
export class ClientRepairsComponent extends Subscriptions implements AfterViewInit {
    /**
     *   GETTERS / SETTERS INPUTES / OUTPUTES ETC.
     **/
    @Input() public clientId!: string;

    /** REPAIRS TAB **/
    repairs!: Repair[];
    isLoadingRepairs = true;
    private refreshTableRepairs$ = new Subject<{ status: string }>();
    @ViewChild(RepairsTableComponent) table!: RepairsTableComponent;

    /**
     *   CONSTRUCTOR
     **/

    constructor(private repairsService: RepairsService, private store: Store) {
        super();
    }

    /**
     *   LIFE-CYCLES COMPONTENT
     **/

    ngAfterViewInit(): void {
        this.getAllRepairs();
    }

    /**
     *   METHODS
     **/

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
                            this.table.sort.active,
                            this.table.sort.direction,
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
