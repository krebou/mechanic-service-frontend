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
import { HttpClientModule } from '@angular/common/http';
import { ClientFormDialogComponent } from './dialogs/client-form-dialog/client-form-dialog.component';
import { ClientDeleteDialogComponent } from './dialogs/client-delete-dialog/client-delete-dialog.component';
import { ActionButtonStandaloneComponent } from '../action-button/action-button.standalone-component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { BeforeTableStandaloneComponent } from '../before-table/before-table.standalone-component';
import { ClientsSelectActionDialogComponent } from './dialogs/clients-select-action-dialog/clients-select-action-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';
import { FeatherIconStandaloneComponent } from '../feather-icon/feather-icon.standalone-component';
import { PageHeaderStandaloneComponent } from '../page-header/page-header.standalone-component';
import { HttpInterceptorsModule } from '../../modules/http-interceptors/http-interceptors.module';
import { ClientsTableStandaloneComponent } from './clients-table/clients-table.standalone-component';

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
        HttpInterceptorsModule,
        ReactiveFormsModule,
        ActionButtonStandaloneComponent,
        BeforeTableStandaloneComponent,
        PipesModule,
        FeatherIconStandaloneComponent,
        PageHeaderStandaloneComponent,
        MatTablePacksetModule,
        MatFormModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        ClientsTableStandaloneComponent,
    ],
})
export class ClientsModule {}
