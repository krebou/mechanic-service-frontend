import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [
            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [style({ opacity: 0 }), animate(300)]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave', animate(600, style({ opacity: 0 }))),
        ]),
    ],
})
export class SnackbarComponent {
    snackbar$: Observable<{ active: boolean; message: string }>;
    isActive: boolean = false;
    color: string = 'success';

    constructor(private store: Store<{ snackbar: any }>) {
        this.snackbar$ = store.select('snackbar');

        store.subscribe(({ snackbar }) => {
            this.isActive = snackbar.active;
            this.color = snackbar.color;
        });
    }
}
