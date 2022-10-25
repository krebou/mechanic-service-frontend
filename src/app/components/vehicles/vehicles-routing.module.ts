import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { VehicleInfoComponent } from './vehicle-info/vehicle-info.component';
import { VehiclesResolver } from '../../resolvers/vehicles.resolver';
import { VehicleResolver } from '../../resolvers/vehicle.resolver';
import { IsLoggedLoadGuard } from '../../guards/is-logged-load.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        title: 'Lista pojazdów',
        component: VehiclesListComponent,
        resolve: {
            vehicles: VehiclesResolver,
        },
        canActivate: [IsLoggedLoadGuard],
    },
    {
        path: 'info/:id',
        title: 'Informacje o pojeździe',
        component: VehicleInfoComponent,
        resolve: {
            vehicle: VehicleResolver,
        },
        canActivate: [IsLoggedLoadGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VehiclesRoutingModule {}
