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
import { Table } from '../../../extends/table';
import { User } from '../../../interface/user.interface';
import {
    MAT_PAGINATOR_DEFAULT_OPTIONS,
    MatPaginator,
    MatPaginatorDefaultOptions,
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, mergeWith, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { isPageEvent } from '../../../helpers/helpers';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatFormModule,
    MatTablePacksetModule,
} from '../../../modules/angular-material/angular-material.module';
import { BeforeTableStandaloneComponent } from '../../before-table/before-table.standalone-component';
import { ActionButtonStandaloneComponent } from '../../action-button/action-button.standalone-component';
import { PipesModule } from '../../../pipes/pipes.module';
import { UserDeleteDialogComponent } from '../dialogs/user-delete-dialog/user-delete-dialog.component';
import { UsersSelectActionDialogComponent } from '../dialogs/users-select-action-dialog/users-select-action-dialog.component';
import { UserFormDialogComponent } from '../dialogs/user-form-dialog/user-form-dialog.component';

@Component({
    selector: 'app-users-table',
    templateUrl: './users-table.standalone-component.html',
    styleUrls: ['./users-table.standalone-component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatFormModule,
        ActionButtonStandaloneComponent,
        BeforeTableStandaloneComponent,
        PipesModule,
        MatButtonModule,
        MatTablePacksetModule,
    ],
})
export class UsersTableStandaloneComponent
    extends Table<User>
    implements OnInit, OnDestroy, AfterViewInit
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

    @Input() set users(users: User[]) {
        this.data = users;
    }
    get users(): User[] {
        return this.data;
    }

    private sort$!: Subscription;

    /***************  CONSTRUCTOR  ***************/

    constructor(
        @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
        matPaginatorDefaultOptions: MatPaginatorDefaultOptions,
        private store: Store,
        private dialogService: MatDialog
    ) {
        super(matPaginatorDefaultOptions);
    }

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit(): void {
        /** Table Settings **/
        this.displayedColumns = [
            'select',
            'firstname',
            'lastname',
            'email',
            'role',
            'status',
            'createdAt',
            'action',
        ];
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

    /**  USER ACTIONS  **/
    onMenuAction(name: string, user: User): void {
        if (name === 'delete') this.deleteUser(user);
        if (name === 'edit') this.editUser(user);
    }

    editUser(user: User): void {
        this.dialogService
            .open(UserFormDialogComponent, {
                data: {
                    action: 'edit',
                    user: user,
                },
            })
            .afterClosed()
            .subscribe({
                next: (response) => {
                    if (response?.status === 'edited') {
                        this.refreshTable$.next({
                            status: 'edited',
                        });
                    }
                },
            });
    }

    deleteUser(user: User): void {
        this.dialogService
            .open(UserDeleteDialogComponent, {
                data: user,
                maxWidth: '640px',
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

    selectedAction(name: string): void {
        this.dialogService
            .open(UsersSelectActionDialogComponent, {
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
