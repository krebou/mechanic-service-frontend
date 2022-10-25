import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../services/clients.service';
import { Client } from '../interface/client.interface';

@Injectable({
    providedIn: 'root',
})
export class ClientInfoResolver implements Resolve<Client> {
    /***************  CONSTRUCTOR  ***************/

    constructor(private clientsService: ClientsService) {}

    /***************  METHODS   ***************/

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Client> {
        return this.clientsService.getClient(`${route.paramMap.get('id')}`);
    }
}
