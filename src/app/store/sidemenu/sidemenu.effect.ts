import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { debounceTime, fromEvent, mergeWith } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { setSidemenu } from './sidemenu.action';
import { SideMenuState } from './sidemenu.reducer';

@Injectable()
export class SidemenuEffects {
    private mobile = false;
    private show = false;

    private onWindowLoad$ = fromEvent(window, 'load').pipe(map(() => 'Loaded Window'));

    mobileEffects$ = createEffect(
        () =>
            fromEvent(window, 'resize').pipe(
                mergeWith(this.onWindowLoad$),
                debounceTime(50),
                map((event) => {
                    if (window.innerWidth > 992) {
                        this.store.dispatch(
                            setSidemenu({ payload: { show: true, mobile: false } })
                        );
                    } else {
                        const show = this.mobile ? this.show : false;
                        this.store.dispatch(setSidemenu({ payload: { show, mobile: true } }));
                    }
                })
            ),
        {
            dispatch: false,
        }
    );

    constructor(private store: Store<{ sidemenu: SideMenuState }>) {
        this.store.select('sidemenu').subscribe(({ show, mobile }) => {
            this.show = show;
            this.mobile = mobile;
        });
    }
}
