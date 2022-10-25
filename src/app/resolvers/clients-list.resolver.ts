import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../services/clients.service';
import { Client } from '../interface/client.interface';
import { GetAllResponse } from '../interface/httpClient.interface';

@Injectable({
    providedIn: 'root',
})
export class ClientsListResolver implements Resolve<GetAllResponse<Client>> {
    /***************  CONSTRUCTOR  ***************/

    constructor(private clientsService: ClientsService) {}

    /***************  METHODS   ***************/

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<GetAllResponse<Client>> {
        return this.clientsService.getAllClients(1, 25, 'desc', 'createdAt');
    }
}
