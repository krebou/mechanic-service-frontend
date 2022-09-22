import { VehiclesComponent } from './vehicles/vehicles.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CarEditComponent } from './car-edit/car-edit.component';
import { VehiclesResolver } from '../../resolvers/vehicles.resolver';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        title: 'Lista pojazdów',
        component: VehiclesComponent,
        resolve: {
            vehicles: VehiclesResolver,
        },
    },
    {
        path: 'info/:id',
        title: 'Informacje pojeździe',
        component: CarEditComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VehiclesRoutingModule {}
