import { MatPaginator, MatPaginatorDefaultOptions } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

export class Table<T extends { id?: string }> {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    data!: T[];

    /** Table Settings **/
    displayedColumns!: string[];

    /** Paginator Settings **/
    protected paginatorTop!: MatPaginator;
    protected paginatorBottom!: MatPaginator;
    protected paginatorArray!: MatPaginator[];

    protected _tablePageIndex = 0;
    get tablePageIndex(): number {
        return this._tablePageIndex + 1;
    }
    protected set tablePageIndex(pageIndex: number) {
        this._tablePageIndex =
            this.paginatorTop.pageIndex =
            this.paginatorBottom.pageIndex =
                pageIndex;
    }

    protected _tablePageSize = this.matPaginatorDefaultOptions.pageSize || 25;
    get tablePageSize(): number {
        return this._tablePageSize;
    }
    protected set tablePageSize(pageSize: number) {
        this._tablePageSize = this.paginatorTop.pageSize = this.paginatorBottom.pageSize = pageSize;
    }

    tableResultsLength = 0;

    protected refreshTable$ = new Subject<{ status: string }>();

    /** MULTI ACTION **/
    selection = new SelectionModel<string>(true, []);
    selectedAll = false;

    /***************  CONSTRUCTOR  ***************/

    constructor(private matPaginatorDefaultOptions: MatPaginatorDefaultOptions) {}

    /***************  METHODS   ***************/

    /** TABLE SELECT CHECKBOX **/

    onSelectAllCheckbox(event: any): void {
        if (event.checked) {
            this.data.forEach((data) => {
                if (data.id !== null) {
                    this.selection.select(data.id || '');
                }
            });

            this.selectedAll = true;
        } else {
            this.clearSelected();
        }
    }

    onSelectSingleCheckbox(id: string): void {
        this.selection.toggle(id);
        this.selectedAll = this.data.length === this.selection.selected.length ? true : false;
    }

    clearSelected(): void {
        // UNCHECK CHECKBOXES
        this.selection.clear();
        this.selectedAll = false;
    }
}
