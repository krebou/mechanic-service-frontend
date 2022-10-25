import { Component } from '@angular/core';
import { DashboardHeaderNavi } from '../../../interface/dashboard-header-navi.interface';

@Component({
    selector: 'app-dashboard-info',
    templateUrl: './dashboard-info.component.html',
    styleUrls: ['./dashboard-info.component.scss'],
})
export class DashboardInfoComponent {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    headerNavi: DashboardHeaderNavi[] = [
        {
            title: 'Dashboard',
            url: '/dashboard',
        },
    ];

    /***************  CONSTRUCTOR  ***************/

    constructor() {}
}
