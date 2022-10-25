import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { VehicleDeleteDialogComponent } from './dialogs/vehicle-delete-dialog/vehicle-delete-dialog.component';
import { VehicleFormDialogComponent } from './dialogs/vehicle-form-dialog/vehicle-form-dialog.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import {
    MatAutocompleteModule,
    MatDialogModule,
    MatFormModule,
    MatProgressSpinnerModule,
    MatTabsModule,
} from '../../modules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { PipesModule } from '../../pipes/pipes.module';
import { BeforeTableStandaloneComponent } from '../before-table/before-table.standalone-component';
import { ActionButtonStandaloneComponent } from '../action-button/action-button.standalone-component';
import { VehiclesSelectActionDialogComponent } from './dialogs/vehicles-select-action-dialog/vehicles-select-action-dialog.component';
import { VehiclesTableStandaloneComponent } from './vehicles-table/vehicles-table.standalone-component';
import { PageHeaderStandaloneComponent } from '../page-header/page-header.standalone-component';
import { MatButtonModule } from '@angular/material/button';
import { HttpInterceptorsModule } from '../../modules/http-interceptors/http-interceptors.module';

@NgModule({
    declarations: [
        VehiclesListComponent,
        VehicleFormDialogComponent,
        VehicleDeleteDialogComponent,
        VehicleInfoComponent,
        VehiclesSelectActionDialogComponent,
    ],
    imports: [
        CommonModule,
        VehiclesRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        PipesModule,
        BeforeTableStandaloneComponent,
        ActionButtonStandaloneComponent,
        VehiclesTableStandaloneComponent,
        PageHeaderStandaloneComponent,
        MatFormModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatTabsModule,
        HttpInterceptorsModule,
    ],
})
export class VehiclesModule {}
