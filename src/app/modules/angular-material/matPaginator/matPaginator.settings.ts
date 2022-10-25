import { MatPaginatorIntl, MatPaginatorDefaultOptions } from '@angular/material/paginator';

export class MatPaginatorSettings {
    paginatorIntl = new MatPaginatorIntl();

    paginatorDefaultOptions: MatPaginatorDefaultOptions = {
        showFirstLastButtons: true,
        pageSizeOptions: [25, 50, 100],
        pageSize: 25,
    };

    matPaginatorIntl() {
        this.paginatorIntl.firstPageLabel = 'Pierwsza strona';
        this.paginatorIntl.lastPageLabel = 'Ostatnia strona';
        this.paginatorIntl.nextPageLabel = 'Następna strona';
        this.paginatorIntl.previousPageLabel = 'Poprzednia strona';
        this.paginatorIntl.itemsPerPageLabel = 'Na stronie:';
        this.paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
            return `strona ${++page} z ${
                Math.ceil(length / pageSize) === 0 ? 1 : Math.ceil(length / pageSize)
            }`;
        };

        return this.paginatorIntl;
    }
}
