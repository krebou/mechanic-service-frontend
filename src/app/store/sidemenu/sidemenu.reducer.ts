import { createReducer, on } from '@ngrx/store';
import { closeMenu, openMenu, setSidemenu, toogleMenu } from './sidemenu.action';

export interface SideMenuState {
    show: boolean;
    mobile: boolean;
}

const initialState: SideMenuState = {
    show: true,
    mobile: false,
};

const _sidemenuReducer = createReducer(
    initialState,
    on(openMenu, (state) => ({ ...state, show: true })),
    on(closeMenu, (state) => ({ ...state, show: false })),
    on(toogleMenu, (state) => ({ ...state, show: !state.show })),
    on(setSidemenu, (state, { payload }) => ({ ...state, ...payload }))
);

export function sidemenuReducer(state: any, action: any) {
    return _sidemenuReducer(state, action);
}
