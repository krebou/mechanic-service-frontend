import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
    resetSnackbar,
    setPrimarySnackbar,
    setSnackbar,
    setSuccessSnackbar,
    setWarnSnackbar,
} from './snackbar.actions';
import { delay, switchMap, map, of } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class SnackbarEffects {
    resetSnackbar$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(setSnackbar, setSuccessSnackbar, setWarnSnackbar, setPrimarySnackbar),
                switchMap(() => {
                    return of({}).pipe(delay(4000));
                }),
                map(() => {
                    this.store.dispatch(resetSnackbar());
                })
            ),
        {
            dispatch: false,
        }
    );

    constructor(private actions$: Actions, private store: Store<{ snackbar: any }>) {}
}
