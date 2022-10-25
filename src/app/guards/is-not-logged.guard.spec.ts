import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { selectIsLogged } from '../store/auth/auth.selectors';
import { of } from 'rxjs';
import { UrlTree } from '@angular/router';
import { IsNotLoggedGuard } from './is-not-logged.guard';

describe('IsNotLoggedGuard', () => {
    let guard: IsNotLoggedGuard;
    const store = jasmine.createSpyObj('store', ['auth', 'select']);

    beforeEach(() => {
        store.select.withArgs(selectIsLogged).and.returnValue(of(false));

        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [
                {
                    provide: Store,
                    useValue: store,
                },
            ],
        });

        guard = TestBed.inject(IsNotLoggedGuard);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should resolve true, if user is not logged', async () => {
        const isNotLogged = await guard['isNotLogged']();

        expect(isNotLogged).toBeTrue();
    });

    it('should redirect to dashboard page, if user is logged', async () => {
        store.select.withArgs(selectIsLogged).and.returnValue(of(true));

        const isNotLogged = await guard['isNotLogged']();

        expect(isNotLogged).toBeInstanceOf(UrlTree);
        expect(isNotLogged.toString()).toBe('/dashboard');
    });

    it('should call isNotLogged', () => {
        const isNotLogged = spyOn<any>(guard, 'isNotLogged');

        guard.canActivate();

        expect(isNotLogged).toHaveBeenCalledTimes(1);

        guard.canLoad();

        expect(isNotLogged).toHaveBeenCalledTimes(2);
    });
});
