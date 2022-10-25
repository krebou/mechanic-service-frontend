import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairsTableStandaloneComponent } from './components/repairs-table/repairs-table.standalone-component';
import { RepairsListComponent } from './components/repairs-list/repairs-list.component';
import { RepairsRoutingModule } from './repairs-routing.module';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatFormModule,
    MatProgressSpinnerModule,
} from '../../modules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { InputPriceFormatDirective } from '../../directives/input-price-format.directive';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpLoadingStatusInterceptor } from '../../interceptor/http-loading-status/http-loading-status.interceptor';
import { RepairDeleteComponent } from './dialogs/repair-delete/repair-delete.component';
import { RepairTableMultiActionDialogComponent } from './dialogs/repair-table-multi-action-dialog/repair-table-multi-action-dialog.component';
import { PageHeaderStandaloneComponent } from '../page-header/page-header.standalone-component';
import { RouterModule } from '@angular/router';
import { RepairCostsComponent } from './components/repair-costs/repair-costs.component';
import { RepairComponent } from './components/repair/repair.component';
import { RepairAddContainerComponent } from './containers/repair-add/repair-add.container';
import { RepairSelectVehicleComponent } from './components/repair-select-vehicle/repair-select-vehicle.component';
import { RepairSelectVehicleContainerComponent } from './containers/repair-select-vehicle/repair-select-vehicle.container';
import { RepairInformationComponent } from './components/repair-information/repair-information.component';
import { RepairSummaryCostsComponent } from './components/repair-summary-costs/repair-summary-costs.component';
import { RepairInfoContainerComponent } from './containers/repair-info/repair-info.container';

@NgModule({
    declarations: [
        RepairsListComponent,
        RepairDeleteComponent,
        RepairTableMultiActionDialogComponent,
        RepairCostsComponent,
        RepairComponent,
        RepairAddContainerComponent,
        RepairInfoContainerComponent,
        RepairSelectVehicleContainerComponent,
        RepairSelectVehicleComponent,
        RepairInformationComponent,
        RepairSummaryCostsComponent,
    ],
    imports: [
        CommonModule,
        RepairsRoutingModule,
        RepairsTableStandaloneComponent,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        PipesModule,
        InputPriceFormatDirective,
        PageHeaderStandaloneComponent,
        MatFormModule,
        MatDialogModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
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
