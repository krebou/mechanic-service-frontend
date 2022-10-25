import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RepairsListComponent } from './components/repairs-list/repairs-list.component';
import { RepairsResolver } from '../../resolvers/repairs.resolver';
import { RepairAddContainerComponent } from './containers/repair-add/repair-add.container';
import { RepairResolver } from '../../resolvers/repair.resolver';
import { RepairInfoContainerComponent } from './containers/repair-info/repair-info.container';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        title: 'Lista napraw',
        component: RepairsListComponent,
        resolve: {
            repairs: RepairsResolver,
        },
    },
    {
        path: 'add',
        title: 'Dodaj naprawę',
        component: RepairAddContainerComponent,
    },
    {
        path: 'info/:id',
        title: 'Informacje o naprawie',
        component: RepairInfoContainerComponent,
        resolve: {
            repair: RepairResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RepairsRoutingModule {}
