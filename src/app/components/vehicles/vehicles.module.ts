import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { VehicleDeleteDialogComponent } from './dialogs/vehicle-delete-dialog/vehicle-delete-dialog.component';
import { VehicleFormDialogComponent } from './vehicle-form-dialog/vehicle-form-dialog.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import {
    MatAutocompleteModule,
    MatDialogModule,
    MatFormModule,
    MatProgressSpinnerModule,
} from '../../modules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VehiclesService } from './vehicles.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CarEditComponent } from './car-edit/car-edit.component';
import { ClientsService } from '../../services/clients.service';
import { HttpLoadingStatusInterceptor } from '../../interceptor/http-loading-status/http-loading-status.interceptor';
import { PipesModule } from '../../pipes/pipes.module';
import { BeforeTableComponent } from '../before-table/before-table.component';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { VehiclesSelectActionDialogComponent } from './dialogs/vehicles-select-action-dialog/vehicles-select-action-dialog.component';
import { VehiclesTableComponent } from './vehicles-table/vehicles-table.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        VehiclesComponent,
        VehicleFormDialogComponent,
        VehicleDeleteDialogComponent,
        CarEditComponent,
        VehiclesSelectActionDialogComponent,
    ],
    imports: [
        CommonModule,
        VehiclesRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        PipesModule,
        BeforeTableComponent,
        ActionButtonComponent,
        VehiclesTableComponent,
        DashboardHeaderComponent,
        MatFormModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
    ],
    providers: [
        VehiclesService,
        ClientsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoadingStatusInterceptor,
            multi: true,
        },
    ],
})
export class VehiclesModule {}
