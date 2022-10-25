import { Injectable } from '@angular/core';
import { GetAllRequestWhere, GetAllResponse } from '../interface/httpClient.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { getAllRequestWhere } from '../helpers/request';
import { API_URL } from '../../environments/environment';
import { Repair } from '../interface/repair.interface';

@Injectable({
    providedIn: 'root',
})
export class RepairsService {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    private apiBaseUrl = API_URL;

    /***************  CONSTRUCTOR  ***************/

    constructor(private httpClient: HttpClient) {}

    /***************  METHODS   ***************/

    getRepair(id: string): Observable<Repair> {
        return this.httpClient.get<Repair>(`${this.apiBaseUrl}/v1/repair/${id}`);
    }

    getAllRepairs(
        page: number = 1,
        per_page: number = 25,
        sort: string = 'asc',
        orderby: string = '',
        where?: GetAllRequestWhere<Repair & { clientId: string }>
    ): Observable<GetAllResponse<Repair>> {
        let params = new HttpParams()
            .set('page', page)
            .set('per_page', per_page)
            .set('orderby', orderby)
            .set('sort', sort.toUpperCase());

        if (where) {
            params = getAllRequestWhere(where, params);
        }

        return this.httpClient.get<GetAllResponse<Repair>>(`${this.apiBaseUrl}/v1/repair/all`, {
            params,
        });
    }

    setRepair(repair: Repair): Observable<{ id: string }> {
        return this.httpClient.post<{ id: string }>(`${this.apiBaseUrl}/v1/repair`, repair);
    }

    updateRepair(repair: Partial<Repair>): Observable<{ updated: boolean }> {
        return this.httpClient.put<{ updated: boolean }>(`${this.apiBaseUrl}/v1/repair/`, repair);
    }

    deleteRepair(id: string): Observable<{ deleted: boolean }> {
        return this.httpClient.delete<{ deleted: boolean }>(`${this.apiBaseUrl}/v1/repair/${id}`);
    }
}
