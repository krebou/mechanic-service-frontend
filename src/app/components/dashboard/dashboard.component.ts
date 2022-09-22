import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeMenu } from './sidemenu/store/sidemenu.action';
import { selectProgressBarShow } from '../dashboard-header/store/progress-bar.selector';
import { ProgressBarState } from '../dashboard-header/store/progress-bar.reducer';
import { delay, Observable } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    sidemenu$ = this.store.select('sidemenu');
    progressbar$ = this.store.select(selectProgressBarShow).pipe(delay(0));

    constructor(
        private store: Store<{
            sidemenu: { show: boolean; mobile: boolean };
            progressbar: ProgressBarState;
        }>
    ) {}

    closeMenu(): void {
        this.store.dispatch(closeMenu());
    }
}
