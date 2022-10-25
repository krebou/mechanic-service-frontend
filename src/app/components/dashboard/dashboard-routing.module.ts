import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardInfoComponent } from './dashboard-info/dashboard-info.component';
import { IsLoggedLoadGuard } from '../../guards/is-logged-load.guard';
import { IsAdminGuard } from '../../guards/is-admin.guard';

const dashboardRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: DashboardInfoComponent,
        canActivate: [IsLoggedLoadGuard],
    },
    {
        path: 'vehicles',
        loadChildren: () => import('../vehicles/vehicles.module').then((m) => m.VehiclesModule),
        canLoad: [IsLoggedLoadGuard],
    },
    {
        path: 'clients',
        loadChildren: () => import('../clients/clients.module').then((m) => m.ClientsModule),
        canLoad: [IsLoggedLoadGuard],
    },
    {
        path: 'repairs',
        loadChildren: () => import('../repairs/repairs.module').then((m) => m.RepairsModule),
        canLoad: [IsLoggedLoadGuard],
    },
    {
        path: 'users',
        loadChildren: () => import('../users/users.module').then((m) => m.UsersModule),
        canLoad: [IsLoggedLoadGuard, IsAdminGuard],
    },
];

const routes: Routes = [
    {
        path: '',
        title: 'Dashboard',
        component: DashboardComponent,
        children: dashboardRoutes,
        canActivate: [IsLoggedLoadGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
