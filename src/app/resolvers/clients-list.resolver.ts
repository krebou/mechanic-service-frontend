import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from '../services/clients.service';
import { Client } from '../interface/client';
import { GetAllResponse } from '../interface/getAll';

@Injectable({
    providedIn: 'root',
})
export class ClientsListResolver implements Resolve<GetAllResponse<Client>> {
    constructor(private clientsService: ClientsService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<GetAllResponse<Client>> {
        return this.clientsService.getAllClients(1, 25, 'createdAt', 'desc');
    }
}
