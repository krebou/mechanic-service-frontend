import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsRoutingModule } from './clients-routing.module';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormModule,
    MatProgressSpinnerModule,
    MatTablePacksetModule,
    MatTabsModule,
} from '../../modules/angular-material/angular-material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ClientFormDialogComponent } from './dialogs/client-form-dialog/client-form-dialog.component';
import { ClientDeleteDialogComponent } from './dialogs/client-delete-dialog/client-delete-dialog.component';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { BeforeTableComponent } from '../before-table/before-table.component';
import { ClientsSelectActionDialogComponent } from './dialogs/clients-select-action-dialog/clients-select-action-dialog.component';
import { HttpLoadingStatusInterceptor } from '../../interceptor/http-loading-status/http-loading-status.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';

@NgModule({
    declarations: [
        ClientsListComponent,
        ClientDeleteDialogComponent,
        ClientInfoComponent,
        ClientsSelectActionDialogComponent,
        ClientFormDialogComponent,
    ],
    imports: [
        CommonModule,
        ClientsRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        ActionButtonComponent,
        BeforeTableComponent,
        PipesModule,
        FeatherIconComponent,
        DashboardHeaderComponent,
        MatTablePacksetModule,
        MatFormModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatTabsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: HttpLoadingStatusInterceptor,
            multi: true,
        },
    ],
})
export class ClientsModule {}
