import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { setWarnSnackbar } from '../../snackbar/store/snackbar.actions';
import { RepairsService } from '../../../services/repairs.service';
import { RepairsTableComponent } from '../repairs-table/repairs-table.component';
import { Store } from '@ngrx/store';
import { Repair } from '../../../interface/repair.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-repairs',
    templateUrl: './repairs.component.html',
    styleUrls: ['./repairs.component.scss'],
})
export class RepairsComponent implements OnInit {
    @ViewChild(RepairsTableComponent) table!: RepairsTableComponent;

    data!: Repair[];
    tableResultsLength = 0;

    protected refreshTable$ = new Subject<{ status: string }>();

    isLoadingResults = true;

    constructor(
        private repairsService: RepairsService,
        private store: Store,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        /** RESOLVER **/
        this.data = this.activatedRoute.snapshot.data['repairs']['data'] || [];
        this.tableResultsLength = this.activatedRoute.snapshot.data['repairs']['count'] || 0;
    }

    ngAfterViewInit(): void {
        this.refreshTable$
            .pipe(
                startWith({}),
                switchMap(() => {
                    return this.repairsService
                        .getAllRepairs(
                            this.table.tablePageIndex,
                            this.table.tablePageSize,
                            this.table.sort.active,
                            this.table.sort.direction
                        )
                        .pipe(
                            catchError(() => {
                                this.store.dispatch(
                                    setWarnSnackbar({
                                        message:
                                            'Pobieranie pojazdów nie powiodło się - SERVER ERROR',
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

    loadData(): void {
        this.refreshTable$.next({
            status: 'tableChange',
        });
    }
}
