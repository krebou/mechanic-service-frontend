import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RepairsService } from '../services/repairs.service';
import { GetAllResponse } from '../interface/httpClient.interface';
import { Repair } from '../interface/repair.interface';

@Injectable({
    providedIn: 'root',
})
export class RepairsResolver implements Resolve<GetAllResponse<Repair>> {
    /***************  CONSTRUCTOR  ***************/

    constructor(private repairsService: RepairsService) {}

    /***************  METHODS   ***************/

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<GetAllResponse<Repair>> {
        //TODO params default
        return this.repairsService.getAllRepairs(1, 25, 'desc', 'createdAt');
    }
}
