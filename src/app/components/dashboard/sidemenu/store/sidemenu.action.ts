import { createAction, props } from '@ngrx/store';
import { SideMenuState } from './sidemenu.reducer';

interface SetSideMenu {
    payload: SideMenuState;
}

export const openMenu = createAction('[Sidemenu] Open');
export const closeMenu = createAction('[Sidemenu] Close');
export const toogleMenu = createAction('[Sidemenu] Toogle Menu');
export const setSidemenu = createAction('[Sidemenu] Set Menu', props<SetSideMenu>());
