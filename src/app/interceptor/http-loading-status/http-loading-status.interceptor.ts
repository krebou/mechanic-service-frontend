import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
    hideProgressBar,
    showProgressBar,
} from '../../components/dashboard-header/store/progress-bar.action';

@Injectable({
    providedIn: 'root',
})
export class HttpLoadingStatusInterceptor implements HttpInterceptor {
    constructor(private store: Store) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.store.dispatch(showProgressBar());
        return next.handle(request).pipe(
            finalize(() => {
                this.store.dispatch(hideProgressBar());
            })
        );
    }
}
