import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { toogleMenu } from '../sidemenu/store/sidemenu.action';
import { SideMenuState } from '../sidemenu/store/sidemenu.reducer';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
    sidemenu$ = this.store.select('sidemenu');

    constructor(private store: Store<{ sidemenu: SideMenuState }>) {}

    toogleMenu(): void {
        this.store.dispatch(toogleMenu());
    }
}
