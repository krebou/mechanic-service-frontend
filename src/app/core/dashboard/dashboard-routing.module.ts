import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";

const dashboardRoutes: Routes = [
  {
    path: 'cars',
    loadChildren: () => import('../../cars/cars.module').then( m => m.CarsModule )
  },
  {
    path: 'clients',
    loadChildren: () => import('../../clients/clients.module').then( m => m.ClientsModule )
  },
  {
    path: 'test',
    title: 'Tdsadada',
    loadComponent: () => import('../../testnumber2/testnumber2.component').then( m => m.Testnumber2Component )
  }

]

const routes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    component: DashboardComponent,
    children: dashboardRoutes
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
