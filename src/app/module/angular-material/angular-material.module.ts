import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {MatPaginatorSettings} from "./matPaginator/matPaginator.settings";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";

const matPaginatorSettings = new MatPaginatorSettings();

const MODULES = [
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatDialogModule,
  MatButtonModule,
  MatRippleModule,
  MatDialogModule
]

@NgModule({
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [MODULES],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: matPaginatorSettings.matPaginatorIntl()
    },
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: matPaginatorSettings.paginatorDefaultOptions
    }
  ]

})
export class AngularMaterialModule { }
