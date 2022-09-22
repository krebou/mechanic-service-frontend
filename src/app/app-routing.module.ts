import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard/clients',
        pathMatch: 'full',
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
