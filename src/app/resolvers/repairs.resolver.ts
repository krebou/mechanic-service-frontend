import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RepairsService } from '../services/repairs.service';
import { GetAllResponse } from '../interface/getAll';
import { Repair } from '../interface/repair.interface';

@Injectable({
    providedIn: 'root',
})
export class RepairsResolver implements Resolve<GetAllResponse<Repair>> {
    constructor(private repairsService: RepairsService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<GetAllResponse<Repair>> {
        //TODO params default
        return this.repairsService.getAllRepairs(1, 25, 'createdAt', 'desc');
    }
}
