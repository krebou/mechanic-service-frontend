import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

export interface AppState {
    auth: AuthState;
}

export const selectAuth = (state: AppState) => state.auth;

export const selectIsLogged = createSelector(selectAuth, (state: AuthState) => state.isLogged);

export const selectAuthError = createSelector(selectAuth, (state: AuthState) => state.authError);

export const selectAuthInProccess = createSelector(
    selectAuth,
    (state: AuthState) => state.inProccess
);

export const selectAuthUser = createSelector(selectAuth, (state: AuthState) => state.user);

export const isAuthUserAdmin = createSelector(selectAuth, (state: AuthState) =>
    state.user?.role === 'admin' ? true : false
);
