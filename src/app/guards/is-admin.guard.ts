import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { isAuthUserAdmin } from '../store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.reducers';

@Injectable({
    providedIn: 'root',
})
export class IsAdminGuard implements CanActivate, CanLoad {
    /***************  CONSTRUCTOR  ***************/

    constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

    /***************  METHODS   ***************/

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.isAdmin();
    }
    canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.isAdmin();
    }

    private isAdmin(): Promise<boolean | UrlTree> {
        return new Promise((resolve, reject) => {
            this.store.select(isAuthUserAdmin).subscribe((isAdmin: boolean) => {
                if (isAdmin) resolve(true);
                resolve(this.router.createUrlTree(['/dashboard']));
            });
        });
    }
}
