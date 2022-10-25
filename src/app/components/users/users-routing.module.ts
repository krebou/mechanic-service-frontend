import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IsLoggedLoadGuard } from '../../guards/is-logged-load.guard';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersResolver } from '../../resolvers/users.resolver';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        title: 'Lista użytkowników',
        component: UsersListComponent,
        resolve: {
            users: UsersResolver,
        },
        canActivate: [IsLoggedLoadGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule {}
