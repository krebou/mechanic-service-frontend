import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarDeleteDialogComponent } from './car-delete-dialog/car-delete-dialog.component';
import { CarAddDialogComponent } from './car-add-dialog/car-add-dialog.component';
import {CarsRoutingModule} from "./cars-routing.module";
import {AngularMaterialModule} from "../module/angular-material/angular-material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DashboardModule} from "../core/dashboard/dashboard.module";
import {CarsService} from "./cars.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    CarsListComponent,
    CarAddDialogComponent,
    CarDeleteDialogComponent,
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    DashboardModule,
    HttpClientModule
  ],
  providers: [
    CarsService,
    ReactiveFormsModule
  ]
})
export class CarsModule { }
