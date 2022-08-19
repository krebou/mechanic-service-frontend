import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientsListComponent} from "./clients-list/clients-list.component";
import {ClientsRoutingModule} from "./clients-routing.module";
import {DashboardModule} from "../core/dashboard/dashboard.module";
import {AngularMaterialModule} from "../module/angular-material/angular-material.module";



@NgModule({
  declarations: [
    ClientsListComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    DashboardModule,
    AngularMaterialModule
  ]
})
export class ClientsModule { }
