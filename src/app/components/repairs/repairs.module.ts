import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairsTableComponent } from './repairs-table/repairs-table.component';
import { RepairsComponent } from './repairs/repairs.component';
import { RepairsRoutingModule } from './repairs-routing.module';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatFormModule,
} from '../../modules/angular-material/angular-material.module';
import { RepairAddComponent } from './repair-add/repair-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RepairAddInformationComponent } from './repair-add/repair-add-information/repair-add-information.component';
import { RepairAddSelectVehicleComponent } from './repair-add/repair-add-select-vehicle/repair-add-select-vehicle.component';
import { PipesModule } from '../../pipes/pipes.module';
import { RepairAddCostsComponent } from './repair-add/repair-add-costs/repair-add-costs.component';
import { InputPriceFormatDirective } from '../../directives/input-price-format.directive';
import { RepairAddSummaryCostsComponent } from './repair-add/repair-add-summary-costs/repair-add-summary-costs.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpLoadingStatusInterceptor } from '../../interceptor/http-loading-status/http-loading-status.interceptor';
import { RepairDeleteComponent } from './dialogs/repair-delete/repair-delete.component';
import { RepairTableMultiActionDialogComponent } from './dialogs/repair-table-multi-action-dialog/repair-table-multi-action-dialog.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';

@NgModule({
    declarations: [
        RepairsComponent,
        RepairAddComponent,
        RepairAddInformationComponent,
        RepairAddSelectVehicleComponent,
        RepairAddCostsComponent,
        RepairAddSummaryCostsComponent,
        RepairDeleteComponent,
        RepairTableMultiActionDialogComponent,
    ],
    imports: [
        CommonModule,
        RepairsRoutingModule,
        RepairsTableComponent,
        ReactiveFormsModule,
        HttpClientModule,
        PipesModule,
        InputPriceFormatDirective,
        DashboardHeaderComponent,
        MatFormModule,
        MatDialogModule,
        MatButtonModule,
        MatAutocompleteModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoadingStatusInterceptor,
            multi: true,
        },
    ],
})
export class RepairsModule {}
