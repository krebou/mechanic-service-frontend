import { createSelector } from '@ngrx/store';
import { ProgressBarState } from './progress-bar.reducer';

export interface FeatureState {
    show: boolean;
}

export interface AppState {
    progressbar: ProgressBarState;
}

export const selectProgressBar = (state: AppState) => state.progressbar;

export const selectProgressBarShow = createSelector(
    selectProgressBar,
    (state: ProgressBarState) => state.show
);
