import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RepairsService } from '../services/repairs.service';
import { Repair } from '../interface/repair.interface';

@Injectable({
    providedIn: 'root',
})
export class RepairResolver implements Resolve<Repair> {
    /***************  CONSTRUCTOR  ***************/

    constructor(private repairsService: RepairsService) {}

    /***************  METHODS   ***************/

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Repair> {
        return this.repairsService.getRepair(`${route.paramMap.get('id')}`);
    }
}
