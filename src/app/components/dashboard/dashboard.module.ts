import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';

@NgModule({
    declarations: [DashboardComponent, SidemenuComponent, TopbarComponent, SnackbarComponent],
    imports: [CommonModule, DashboardRoutingModule, MatProgressBarModule, FeatherIconComponent],
})
export class DashboardModule {}
