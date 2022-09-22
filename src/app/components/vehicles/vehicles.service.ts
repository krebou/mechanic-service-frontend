import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../../interface/vehicle.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetAllRequestWhere, GetAllResponse } from '../../interface/getAll';
import { API_URL } from '../../../environments/environment';
import { getAllRequestWhere } from '../../helpers/request';

@Injectable({
    providedIn: 'root',
})
export class VehiclesService {
    private apiBaseUrl = API_URL;

    constructor(private httpClient: HttpClient) {}

    getAllVehicles(
        page: number = 1,
        per_page: number = 25,
        sort: string = '',
        orderby: string = 'asc',
        where?: GetAllRequestWhere<Vehicle>
    ): Observable<GetAllResponse<Vehicle>> {
        let params = new HttpParams()
            .set('page', page)
            .set('per_page', per_page)
            .set('orderby', sort)
            .set('sort', orderby.toUpperCase());

        if (where) {
            params = getAllRequestWhere(where, params);
        }

        return this.httpClient.get<GetAllResponse<Vehicle>>(`${this.apiBaseUrl}/v1/vehicle/all`, {
            params,
        });
    }

    setVehicle(car: Vehicle): Observable<{ id: string }> {
        return this.httpClient.post<{ id: string }>(`${this.apiBaseUrl}/v1/vehicle/`, car);
    }

    deleteVehicle(id: string): Observable<{ deleted: boolean }> {
        return this.httpClient.delete<{ deleted: boolean }>(`${this.apiBaseUrl}/v1/vehicle/${id}`);
    }
}
