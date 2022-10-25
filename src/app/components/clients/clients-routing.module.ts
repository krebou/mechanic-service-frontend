import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ClientsListResolver } from '../../resolvers/clients-list.resolver';
import { ClientInfoResolver } from '../../resolvers/client-info.resolver';
import { IsLoggedLoadGuard } from '../../guards/is-logged-load.guard';

const routes: Routes = [
    {
        component: ClientsListComponent,
        path: '',
        pathMatch: 'full',
        title: 'Lista klientów',
        resolve: {
            clients: ClientsListResolver,
        },
        canActivate: [IsLoggedLoadGuard],
    },
    {
        path: 'info/:id',
        title: 'Informacje o kliencie',
        component: ClientInfoComponent,
        resolve: {
            client: ClientInfoResolver,
        },
        canActivate: [IsLoggedLoadGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientsRoutingModule {}
