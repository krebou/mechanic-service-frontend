import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientsService } from '../services/clients.service';
import { Client } from '../interface/client';

@Injectable({
    providedIn: 'root',
})
export class ClientInfoResolver implements Resolve<Client> {
    constructor(private clientsService: ClientsService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client> {
        return this.clientsService.getClient(`${route.paramMap.get('id')}`);
    }
}
