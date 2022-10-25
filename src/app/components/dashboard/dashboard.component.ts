import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeMenu } from '../../store/sidemenu/sidemenu.action';
import { selectProgressBarShow } from '../../store/progress-bar/progress-bar.selector';
import { ProgressBarState } from '../../store/progress-bar/progress-bar.reducer';
import { delay } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    sidemenu$ = this.store.select('sidemenu');
    progressbar$ = this.store.select(selectProgressBarShow).pipe(delay(0));

    /***************  CONSTRUCTOR  ***************/

    constructor(
        private store: Store<{
            sidemenu: { show: boolean; mobile: boolean };
            progressbar: ProgressBarState;
        }>
    ) {}

    /***************  METHODS   ***************/

    closeMenu(): void {
        this.store.dispatch(closeMenu());
    }
}
