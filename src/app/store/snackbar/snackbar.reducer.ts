import { createReducer, on } from '@ngrx/store';
import {
    resetSnackbar,
    setPrimarySnackbar,
    setSnackbar,
    setSuccessSnackbar,
    setWarnSnackbar,
} from './snackbar.actions';

interface State {
    active: boolean;
    color: 'primary' | 'warn' | 'success';
    message: string;
}

const initialState: State = {
    active: false,
    color: 'warn',
    message: '',
};

const _snackbarReducer = createReducer(
    initialState,
    on(setSnackbar, (state, { payload }) => {
        return { ...state, ...payload, active: true };
    }),
    on(setWarnSnackbar, (state, { message }) => {
        return { ...state, message, active: true, color: 'warn' };
    }),
    on(setSuccessSnackbar, (state, { message }) => {
        return { ...state, message, active: true, color: 'success' };
    }),
    on(setPrimarySnackbar, (state, { message }) => {
        return { ...state, message, active: true, color: 'primary' };
    }),
    on(resetSnackbar, () => initialState)
);

export function snackbarReducer(state: any, action: any) {
    return _snackbarReducer(state, action);
}
