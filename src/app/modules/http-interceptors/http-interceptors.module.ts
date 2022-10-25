import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpLoadingStatusInterceptor } from '../../interceptor/http-loading-status/http-loading-status.interceptor';
import { HttpAuthHeaderInterceptor } from '../../interceptor/http-auth-header/http-auth-header.interceptor';
import { HttpAuthUnauthorizedInterceptor } from '../../interceptor/http-auth-unauthorized/http-auth-unauthorized.interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoadingStatusInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAuthHeaderInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpAuthUnauthorizedInterceptor,
            multi: true,
        },
    ],
})
export class HttpInterceptorsModule {}
