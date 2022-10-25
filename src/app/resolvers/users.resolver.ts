import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GetAllResponse } from '../interface/httpClient.interface';
import { UsersService } from '../services/users.service';
import { User } from '../interface/user.interface';

@Injectable({
    providedIn: 'root',
})
export class UsersResolver implements Resolve<GetAllResponse<User>> {
    /***************  CONSTRUCTOR  ***************/

    constructor(private usersService: UsersService) {}

    /***************  METHODS   ***************/

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<GetAllResponse<User>> {
        //TODO params default
        return this.usersService.getAllUsers(1, 25, 'desc', 'createdAt');
    }
}
