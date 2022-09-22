import { Injectable } from '@angular/core';
import { GetAllRequestWhere, GetAllResponse } from '../interface/getAll';
import { Vehicle } from '../interface/vehicle.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { getAllRequestWhere } from '../helpers/request';
import { API_URL } from '../../environments/environment';
import { Repair } from '../interface/repair.interface';

@Injectable({
    providedIn: 'root',
})
export class RepairsService {
    private apiBaseUrl = API_URL;

    constructor(private httpClient: HttpClient) {}

    getAllRepairs(
        page: number = 1,
        per_page: number = 25,
        sort: string = '',
        orderby: string = 'asc',
        where?: GetAllRequestWhere<Repair & { clientId: string }>
    ): Observable<GetAllResponse<Repair>> {
        let params = new HttpParams()
            .set('page', page)
            .set('per_page', per_page)
            .set('orderby', sort)
            .set('sort', orderby.toUpperCase());

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

    deleteRepair(id: string): Observable<{ deleted: boolean }> {
        return this.httpClient.delete<{ deleted: boolean }>(`${this.apiBaseUrl}/v1/repair/${id}`);
    }
}
