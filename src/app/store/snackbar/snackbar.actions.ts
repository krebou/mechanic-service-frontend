import { createAction, props } from '@ngrx/store';

interface Action {
    type: string;
}

interface State {
    payload: {
        color: 'primary' | 'warn' | 'success';
        message: string;
    };
}

export const setSnackbar = createAction('[Snackbar Component] SetSnackbar', props<State>());
export const setWarnSnackbar = createAction(
    '[Snackbar Component] SetWarnSnackbar',
    props<{ message: string }>()
);
export const setPrimarySnackbar = createAction(
    '[Snackbar Component] SetPrimarySnackbar',
    props<{ message: string }>()
);
export const setSuccessSnackbar = createAction(
    '[Snackbar Component] SetSuccessSnackbar',
    props<{ message: string }>()
);
export const resetSnackbar = createAction('[Snackbar Component] ResetSnackbar');
