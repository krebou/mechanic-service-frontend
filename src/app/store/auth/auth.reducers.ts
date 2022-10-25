import { createReducer, on } from '@ngrx/store';
import {
    authCheckTokenFail,
    authCheckTokenSuccess,
    authFail,
    authLogin,
    authLogout,
    authStart,
} from './auth.actions';

export interface AuthPayload {
    user: {
        id: string;
        email: string;
        firstname: string;
        role: string;
    } | null;
    token: string | null;
}

export interface AuthState extends AuthPayload {
    isLogged: boolean;
    authError: boolean;
    inProccess: boolean;
}

const initialState: AuthState = {
    isLogged: false,
    authError: false,
    inProccess: false,
    user: null,
    token: null,
};

const _authReducer = createReducer(
    initialState,
    on(authStart, (state) => {
        return { ...state, inProccess: true };
    }),
    on(authLogin, authCheckTokenSuccess, (state, payload: AuthPayload) => {
        if (payload.token) localStorage.setItem('auth_token', payload.token);
        return { ...state, ...payload, isLogged: true, authError: false, inProccess: false };
    }),
    on(authLogout, authCheckTokenFail, (state) => {
        localStorage.removeItem('auth_token');
        return { ...state, ...initialState };
    }),
    on(authFail, (state) => {
        localStorage.removeItem('auth_token');
        return { ...state, ...initialState, authError: true, inProccess: false };
    })
);

export function authReducer(state: any, action: any) {
    return _authReducer(state, action);
}
