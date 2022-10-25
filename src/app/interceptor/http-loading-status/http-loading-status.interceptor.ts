import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { hideProgressBar, showProgressBar } from '../../store/progress-bar/progress-bar.action';

@Injectable({
    providedIn: 'root',
})
export class HttpLoadingStatusInterceptor implements HttpInterceptor {
    /***************  CONSTRUCTOR  ***************/

    constructor(private store: Store) {}

    /***************  METHODS   ***************/

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.store.dispatch(showProgressBar());
        return next.handle(request).pipe(
            finalize(() => {
                this.store.dispatch(hideProgressBar());
            })
        );
    }
}
