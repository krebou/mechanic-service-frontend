import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ClientsListResolver } from '../../resolvers/clients-list.resolver';
import { ClientInfoResolver } from '../../resolvers/client-info.resolver';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
    {
        component: ClientsListComponent,
        path: '',
        pathMatch: 'full',
        title: 'Lista klientów',
        resolve: {
            clients: ClientsListResolver,
        },
    },
    {
        path: 'info/:id',
        title: 'Informacje o kliencie',
        component: ClientInfoComponent,
        resolve: {
            client: ClientInfoResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes), HttpClientModule],
    exports: [RouterModule, HttpClientModule],
})
export class ClientsRoutingModule {}
