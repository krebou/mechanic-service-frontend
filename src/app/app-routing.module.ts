import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedLoadGuard } from './guards/is-logged-load.guard';
import { IsNotLoggedGuard } from './guards/is-not-logged.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule),
        canLoad: [IsNotLoggedGuard],
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./components/dashboard/dashboard.module').then((m) => m.DashboardModule),
        canLoad: [IsLoggedLoadGuard],
    },
    {
        path: '**',
        redirectTo: '/dashboard',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
