import { createReducer, on } from '@ngrx/store';
import { hideProgressBar, showProgressBar } from './progress-bar.action';

export interface ProgressBarState {
    show: boolean;
}

const initialState: ProgressBarState = {
    show: false,
};

const _progressBarReducer = createReducer(
    initialState,
    on(showProgressBar, () => ({ show: true })),
    on(hideProgressBar, () => ({ show: false }))
);

export function progressBarReducer(state: any, action: any) {
    return _progressBarReducer(state, action);
}
