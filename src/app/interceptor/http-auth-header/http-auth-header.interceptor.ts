import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { mergeMap, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { API_URL } from '../../../environments/environment';
import { AuthPayload } from '../../store/auth/auth.reducers';

@Injectable({
    providedIn: 'root',
})
export class HttpAuthHeaderInterceptor implements HttpInterceptor {
    /***************  CONSTRUCTOR  ***************/

    constructor(private store: Store<{ auth: AuthPayload }>) {}

    /***************  METHODS   ***************/

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return this.store.select('auth').pipe(
            take(1),
            mergeMap((auth) => {
                const isApiUrl = request.url.startsWith(API_URL);

                if (auth.token && isApiUrl) {
                    request = request.clone({
                        setHeaders: { Authorization: `Bearer ${auth.token}` },
                    });
                }

                return next.handle(request);
            })
        );
    }
}
