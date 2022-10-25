import { TestBed } from '@angular/core/testing';

import { IsLoggedLoadGuard } from './is-logged-load.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { selectIsLogged } from '../store/auth/auth.selectors';
import { of } from 'rxjs';
import { UrlTree } from '@angular/router';

describe('IsLoggedLoadGuard', () => {
    let guard: IsLoggedLoadGuard;
    const store = jasmine.createSpyObj('store', ['auth', 'select']);

    beforeEach(() => {
        store.select.withArgs(selectIsLogged).and.returnValue(of(true));

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: Store,
                    useValue: store,
                },
            ],
        });

        guard = TestBed.inject(IsLoggedLoadGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should resolve true, if user is logged', async () => {
        const isLogged = await guard['isLogged']();

        expect(isLogged).toBeTrue();
    });

    it('should redirect to login page, if user is not logged', async () => {
        store.select.withArgs(selectIsLogged).and.returnValue(of(false));

        const isLogged = await guard['isLogged']();

        expect(isLogged).toBeInstanceOf(UrlTree);
        expect(isLogged.toString()).toBe('/login');
    });

    it('should call isLogged', () => {
        const isLogged = spyOn<any>(guard, 'isLogged');

        guard.canActivate();

        expect(isLogged).toHaveBeenCalledTimes(1);

        guard.canLoad();

        expect(isLogged).toHaveBeenCalledTimes(2);
    });
});
