import {createAction, props} from '@ngrx/store';

interface Action {
  type: string;
}

interface State{
  payload: {
    color: 'primary' | 'warn' | 'success';
    message: string;
  }
}

export const setSnackbar = createAction('[Snackbar Component] SetSnackbar', props<State>());
export const resetSnackbar = createAction('[Snackbar Component] ResetSnackbar');
