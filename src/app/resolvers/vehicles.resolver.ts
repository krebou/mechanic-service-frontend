import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GetAllResponse } from '../interface/getAll';
import { Vehicle } from '../interface/vehicle.interface';
import { VehiclesService } from '../components/vehicles/vehicles.service';

@Injectable({
    providedIn: 'root',
})
export class VehiclesResolver implements Resolve<GetAllResponse<Vehicle>> {
    constructor(private vehiclesService: VehiclesService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<GetAllResponse<Vehicle>> {
        //TODO params default
        return this.vehiclesService.getAllVehicles(1, 25, 'createdAt', 'desc');
    }
}
