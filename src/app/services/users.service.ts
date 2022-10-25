import { Injectable } from '@angular/core';
import { GetAllRequestWhere, GetAllResponse } from '../interface/httpClient.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { getAllRequestWhere } from '../helpers/request';
import { User } from '../interface/user.interface';
import { API_URL } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    private apiBaseUrl = API_URL;

    /***************  CONSTRUCTOR  ***************/

    constructor(private httpClient: HttpClient) {}

    /***************  METHODS   ***************/

    setUser(user: User): Observable<{ id: string }> {
        return this.httpClient.post<{ id: string }>(`${this.apiBaseUrl}/v1/user`, user);
    }

    updateUser(user: Partial<User>): Observable<{ updated: boolean }> {
        return this.httpClient.put<{ updated: boolean }>(`${this.apiBaseUrl}/v1/user`, user);
    }

    deleteUser(id: string): Observable<{ deleted: boolean }> {
        return this.httpClient.delete<{ deleted: boolean }>(`${this.apiBaseUrl}/v1/user/${id}`);
    }

    getAllUsers(
        page: number = 1,
        per_page: number = 25,
        sort: string = 'asc',
        orderby: string = '',
        where?: GetAllRequestWhere<User>
    ): Observable<GetAllResponse<User>> {
        let params = new HttpParams()
            .set('page', page)
            .set('per_page', per_page)
            .set('orderby', orderby)
            .set('sort', sort.toUpperCase());

        if (where) {
            params = getAllRequestWhere(where, params);
        }

        return this.httpClient.get<GetAllResponse<User>>(`${this.apiBaseUrl}/v1/user/all`, {
            params,
        });
    }
}
