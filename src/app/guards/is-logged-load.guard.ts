import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../store/auth/auth.reducers';
import { Store } from '@ngrx/store';
import { selectIsLogged } from '../store/auth/auth.selectors';

@Injectable({
    providedIn: 'root',
})
export class IsLoggedLoadGuard implements CanLoad {
    /***************  CONSTRUCTOR  ***************/

    constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

    /***************  METHODS   ***************/

    canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.isLogged();
    }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.isLogged();
    }

    private isLogged(): Promise<boolean | UrlTree> {
        return new Promise((resolve, reject) => {
            this.store.select(selectIsLogged).subscribe((isLogged: boolean) => {
                if (isLogged) resolve(true);
                resolve(this.router.createUrlTree(['/login']));
            });
        });
    }
}
