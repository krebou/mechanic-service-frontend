import { TestBed } from '@angular/core/testing';

import { HttpLoadingStatusInterceptor } from './http-loading-status.interceptor';

describe('LoadingStatusInterceptor', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [HttpLoadingStatusInterceptor],
        })
    );

    it('should be created', () => {
        const interceptor: HttpLoadingStatusInterceptor = TestBed.inject(
            HttpLoadingStatusInterceptor
        );
        expect(interceptor).toBeTruthy();
    });
});
