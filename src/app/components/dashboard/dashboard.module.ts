import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardSidemenuComponent } from './dashboard-sidemenu/dashboard-sidemenu.component';
import { DashboardTopbarComponent } from './dashboard-topbar/dashboard-topbar.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FeatherIconStandaloneComponent } from '../feather-icon/feather-icon.standalone-component';
import { MatButtonModule } from '../../modules/angular-material/angular-material.module';
import { DashboardInfoComponent } from './dashboard-info/dashboard-info.component';
import { PageHeaderStandaloneComponent } from '../page-header/page-header.standalone-component';

@NgModule({
    declarations: [
        DashboardComponent,
        DashboardSidemenuComponent,
        DashboardTopbarComponent,
        SnackbarComponent,
        DashboardInfoComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatButtonModule,
        MatProgressBarModule,
        FeatherIconStandaloneComponent,
        PageHeaderStandaloneComponent,
    ],
})
export class DashboardModule {}
