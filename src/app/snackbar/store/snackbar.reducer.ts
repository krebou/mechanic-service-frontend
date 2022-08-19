import { createReducer, on } from '@ngrx/store';
import {resetSnackbar, setSnackbar} from './snackbar.actions';

interface State{
  active: boolean,
  color: 'primary' | 'warn' | 'success';
  message: string;
}

const initialState: State = {
  active: false,
  color: 'warn',
  message: ''
}

const _snackbarReducer = createReducer(
  initialState,
  on(setSnackbar, (state, { payload }) => {
    return { ...state,  ...payload, active: true }
  }),
  on(resetSnackbar, () => initialState )
)

export function snackbarReducer( state: any, action: any ){
  return _snackbarReducer(state, action);
}
