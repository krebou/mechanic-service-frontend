import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Vehicle } from '../interface/vehicle.interface';
import { VehiclesService } from '../services/vehicles.service';

@Injectable({
    providedIn: 'root',
})
export class VehicleResolver implements Resolve<Vehicle> {
    /***************  CONSTRUCTOR  ***************/

    constructor(private vehiclesService: VehiclesService) {}

    /***************  METHODS   ***************/

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Vehicle> {
        return this.vehiclesService.getVehicle(route.params['id']);
    }
}
