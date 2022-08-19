import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {DashboardComponent} from "./dashboard.component";
import {SideMenuComponent} from "../side-menu/side-menu.component";
import {TopBarComponent} from "../top-bar/top-bar.component";
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import {RouterModule} from "@angular/router";
import {ShareModule} from "../../share/share.module";
import { ReactiveFormsModule} from "@angular/forms";
import {SnackbarComponent} from "../../snackbar/snackbar.component";

@NgModule({
  declarations: [
    DashboardComponent,
    SideMenuComponent,
    TopBarComponent,
    DashboardHeaderComponent,
    SnackbarComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        RouterModule,
        ShareModule,
        ReactiveFormsModule,
    ],
  exports: [
    DashboardHeaderComponent
  ]
})
export class DashboardModule { }
