import { TestBed } from '@angular/core/testing';

import { IsAdminGuard } from './is-admin.guard';
import { Store } from '@ngrx/store';
import { isAuthUserAdmin } from '../store/auth/auth.selectors';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UrlTree } from '@angular/router';

describe('IsAdminGuard', () => {
    let guard: IsAdminGuard;
    const store = jasmine.createSpyObj('store', ['select']);

    beforeEach(() => {
        store.select.withArgs(isAuthUserAdmin).and.returnValue(of(true));

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: Store,
                    useValue: store,
                },
            ],
        });
        guard = TestBed.inject(IsAdminGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should resolve true, if user[admin] is logged', async () => {
        const isAdmin = await guard['isAdmin']();

        expect(isAdmin).toBeTrue();
    });

    it('should redirect to dashboard page, if user is not admin', async () => {
        store.select.withArgs(isAuthUserAdmin).and.returnValue(of(false));

        const isAdmin = await guard['isAdmin']();

        expect(isAdmin).toBeInstanceOf(UrlTree);
        expect(isAdmin.toString()).toBe('/dashboard');
    });

    it('should call isAdmin', () => {
        const isAdmin = spyOn<any>(guard, 'isAdmin');

        guard.canActivate();

        expect(isAdmin).toHaveBeenCalledTimes(1);

        guard.canLoad();

        expect(isAdmin).toHaveBeenCalledTimes(2);
    });
});
