import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GetAllResponse } from '../interface/httpClient.interface';
import { Vehicle } from '../interface/vehicle.interface';
import { VehiclesService } from '../services/vehicles.service';

@Injectable({
    providedIn: 'root',
})
export class VehiclesResolver implements Resolve<GetAllResponse<Vehicle>> {
    /***************  CONSTRUCTOR  ***************/

    constructor(private vehiclesService: VehiclesService) {}

    /***************  METHODS   ***************/

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<GetAllResponse<Vehicle>> {
        //TODO params default
        return this.vehiclesService.getAllVehicles(1, 25, 'desc', 'createdAt');
    }
}
