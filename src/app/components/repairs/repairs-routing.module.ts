import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RepairsComponent } from './repairs/repairs.component';
import { RepairAddComponent } from './repair-add/repair-add.component';
import { RepairsResolver } from '../../resolvers/repairs.resolver';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        title: 'Lista napraw',
        component: RepairsComponent,
        resolve: {
            repairs: RepairsResolver,
        },
    },
    {
        path: 'add',
        title: 'Dodaj naprawę',
        component: RepairAddComponent,
    },
    {
        path: 'info/:id',
        title: 'Informacje o naprawie',
        component: RepairAddComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RepairsRoutingModule {}
