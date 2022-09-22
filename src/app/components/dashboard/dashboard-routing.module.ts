import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const dashboardRoutes: Routes = [
    {
        path: 'vehicles',
        title: 'Lista pojazdów',
        loadChildren: () => import('../vehicles/vehicles.module').then((m) => m.VehiclesModule),
    },
    {
        path: 'clients',
        title: 'Lista klientów',
        loadChildren: () => import('../clients/clients.module').then((m) => m.ClientsModule),
    },
    {
        path: 'repairs',
        title: 'Lista napraw',
        loadChildren: () => import('../repairs/repairs.module').then((m) => m.RepairsModule),
    },
];

const routes: Routes = [
    {
        path: '',
        title: 'Dashboard',
        component: DashboardComponent,
        children: dashboardRoutes,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
