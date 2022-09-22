import { Injectable } from '@angular/core';
import { Client } from '../interface/client';
import { Observable } from 'rxjs';
import { API_URL } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetAllResponse } from '../interface/getAll';

@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    private apiBaseUrl = API_URL;

    constructor(private httpClient: HttpClient) {}

    getClient(id: string): Observable<Client> {
        return this.httpClient.get<Client>(`${this.apiBaseUrl}/v1/client/${id}`);
    }

    addClient(client: Client): Observable<{ id: string }> {
        return this.httpClient.post<{ id: string }>(`${this.apiBaseUrl}/v1/client/`, client);
    }

    updateClient(client: Client): Observable<{ updated: boolean }> {
        return this.httpClient.put<{ updated: boolean }>(`${this.apiBaseUrl}/v1/client/`, client);
    }

    deleteClient(id: string): Observable<{ deleted: boolean }> {
        return this.httpClient.delete<{ deleted: boolean }>(`${this.apiBaseUrl}/v1/client/${id}`);
    }

    getAllClients(
        page: number = 1,
        per_page: number = 25,
        sort: string = '',
        orderby: string = 'asc',
        where: string = ''
    ): Observable<GetAllResponse<Client>> {
        let params = new HttpParams()
            .set('page', page)
            .set('per_page', per_page)
            .set('orderby', sort)
            .set('sort', orderby.toUpperCase());

        if (where) params = params.append('where[name][$find]', where);

        return this.httpClient.get<GetAllResponse<Client>>(`${this.apiBaseUrl}/v1/client/`, {
            params,
        });
    }
}
