import { Injectable } from '@angular/core';
import { Client } from '../interface/client.interface';
import { Observable } from 'rxjs';
import { API_URL } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetAllRequestWhere, GetAllResponse } from '../interface/httpClient.interface';
import { getAllRequestWhere } from '../helpers/request';

@Injectable({
    providedIn: 'root',
})
export class ClientsService {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    private apiBaseUrl = API_URL;

    /***************  CONSTRUCTOR  ***************/

    constructor(private httpClient: HttpClient) {}

    /***************  METHODS   ***************/

    getClient(id: string): Observable<Client> {
        return this.httpClient.get<Client>(`${this.apiBaseUrl}/v1/client/${id}`);
    }

    addClient(client: Client): Observable<{ id: string }> {
        return this.httpClient.post<{ id: string }>(`${this.apiBaseUrl}/v1/client/`, client);
    }

    updateClient(client: Partial<Client>): Observable<{ updated: boolean }> {
        return this.httpClient.put<{ updated: boolean }>(`${this.apiBaseUrl}/v1/client/`, client);
    }

    deleteClient(id: string): Observable<{ deleted: boolean }> {
        return this.httpClient.delete<{ deleted: boolean }>(`${this.apiBaseUrl}/v1/client/${id}`);
    }

    getAllClients(
        page: number = 1,
        per_page: number = 25,
        sort: string = 'asc',
        orderby: string = '',
        where?: GetAllRequestWhere<Client>
    ): Observable<GetAllResponse<Client>> {
        let params = new HttpParams()
            .set('page', page)
            .set('per_page', per_page)
            .set('orderby', orderby)
            .set('sort', sort.toUpperCase());

        if (where) {
            params = getAllRequestWhere(where, params);
        }

        return this.httpClient.get<GetAllResponse<Client>>(`${this.apiBaseUrl}/v1/client/all`, {
            params,
        });
    }
}
