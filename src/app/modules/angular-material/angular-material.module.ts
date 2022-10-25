import { NgModule } from '@angular/core';
import {
    MAT_PAGINATOR_DEFAULT_OPTIONS,
    MatPaginatorIntl,
    MatPaginatorModule as _MatPaginatorModule,
} from '@angular/material/paginator';
import { MatPaginatorSettings } from './matPaginator/matPaginator.settings';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule as _MatTableModule } from '@angular/material/table';
import { MatSortModule as _MatSortModule } from '@angular/material/sort';
import {
    MAT_DIALOG_DEFAULT_OPTIONS,
    MatDialogModule as _MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule as _MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule as _MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule as _MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule as _MatMenuModule } from '@angular/material/menu';
import { MAT_TABS_CONFIG, MatTabsModule as _MatTabsModule } from '@angular/material/tabs';

const matPaginatorSettings = new MatPaginatorSettings();

export const MatTableModule = _MatTableModule;
export const MatSortModule = _MatSortModule;
export const MatMenuModule = _MatMenuModule;
export const MatProgressSpinnerModule = _MatProgressSpinnerModule;
export const MatAutocompleteModule = _MatAutocompleteModule;
/**
 *  TABS MODULE
 */
@NgModule({
    imports: [_MatTabsModule],
    exports: [_MatTabsModule],
    providers: [
        {
            provide: MAT_TABS_CONFIG,
            useValue: {
                animationDuration: '0ms',
            },
        },
    ],
})
export class MatTabsModule {}

/**
 *  BUTTON MODULE
 */
@NgModule({
    imports: [_MatButtonModule, MatRippleModule],
    exports: [_MatButtonModule, MatRippleModule],
})
export class MatButtonModule {}

/**
 *  FROM PACKSET
 */
@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        MatRippleModule,
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        MatRippleModule,
    ],
    providers: [
        {
            provide: MAT_RADIO_DEFAULT_OPTIONS,
            useValue: {
                color: 'primary',
            },
        },
    ],
})
export class MatFormModule {}

/**
 *  DIALOG MODULE
 */
@NgModule({
    imports: [_MatDialogModule],
    exports: [_MatDialogModule],
    providers: [
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                maxWidth: '100vw',
                width: '800px',
                height: 'auto',
                maxHeight: '100vh',
            },
        },
    ],
})
export class MatDialogModule {}

/**
 *  PAGINATOR MODULE
 */
@NgModule({
    imports: [_MatPaginatorModule],
    exports: [_MatPaginatorModule],
    providers: [
        {
            provide: MatPaginatorIntl,
            useValue: matPaginatorSettings.matPaginatorIntl(),
        },
        {
            provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
            useValue: matPaginatorSettings.paginatorDefaultOptions,
        },
    ],
})
export class MatPaginatorModule {}

/**
 *  TABLE PACKSET
 */
@NgModule({
    imports: [MatTableModule, MatPaginatorModule, _MatSortModule],
    exports: [MatTableModule, MatPaginatorModule, _MatSortModule],
})
export class MatTablePacksetModule {}
