import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../interface/vehicle.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetAllRequestWhere, GetAllResponse } from '../interface/httpClient.interface';
import { API_URL } from '../../environments/environment';
import { getAllRequestWhere } from '../helpers/request';

@Injectable({
    providedIn: 'root',
})
export class VehiclesService {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    private apiBaseUrl = API_URL;

    /***************  CONSTRUCTOR  ***************/

    constructor(private httpClient: HttpClient) {}

    /***************  METHODS   ***************/

    getVehicle(id: string): Observable<Vehicle> {
        return this.httpClient.get<Vehicle>(`${this.apiBaseUrl}/v1/vehicle/${id}`);
    }

    setVehicle(car: Vehicle): Observable<{ id: string }> {
        return this.httpClient.post<{ id: string }>(`${this.apiBaseUrl}/v1/vehicle/`, car);
    }

    updateVehicle(vehicle: Partial<Vehicle>): Observable<{ updated: boolean }> {
        return this.httpClient.put<{ updated: boolean }>(`${this.apiBaseUrl}/v1/vehicle/`, vehicle);
    }

    deleteVehicle(id: string): Observable<{ deleted: boolean }> {
        return this.httpClient.delete<{ deleted: boolean }>(`${this.apiBaseUrl}/v1/vehicle/${id}`);
    }

    getAllVehicles(
        page: number = 1,
        per_page: number = 25,
        sort: string = 'asc',
        orderby: string = '',
        where?: GetAllRequestWhere<Vehicle>
    ): Observable<GetAllResponse<Vehicle>> {
        let params = new HttpParams()
            .set('page', page)
            .set('per_page', per_page)
            .set('orderby', orderby)
            .set('sort', sort.toUpperCase());

        if (where) {
            params = getAllRequestWhere(where, params);
        }

        return this.httpClient.get<GetAllResponse<Vehicle>>(`${this.apiBaseUrl}/v1/vehicle/all`, {
            params,
        });
    }
}
