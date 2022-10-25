import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideMenuState } from '../../../store/sidemenu/sidemenu.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { closeMenu } from '../../../store/sidemenu/sidemenu.action';

interface Menu {
    name: string;
    description?: string;
    children: MenuItem[];
}

// TODO remove ? from router
interface MenuItem {
    name: string;
    icon: string;
    router?: string;
    children?: MenuItem[];
}
@Component({
    selector: 'app-dashboard-sidemenu',
    templateUrl: './dashboard-sidemenu.component.html',
    styleUrls: ['./dashboard-sidemenu.component.scss'],
})
export class DashboardSidemenuComponent implements OnInit, OnDestroy {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    private sideMenu$!: Subscription;

    mobile = false;
    show = true;

    items: Menu[] = [
        {
            name: 'Start',
            children: [
                {
                    name: 'Dashboard',
                    icon: 'home',
                    router: '/dashboard',
                },
            ],
        },
        {
            name: 'Warsztat',
            description: 'Informacje z warsztatu',
            children: [
                {
                    name: 'Naprawy',
                    icon: 'file-text',
                    router: '/dashboard/repairs',
                },
                {
                    name: 'Klienci',
                    icon: 'dollar-sign',
                    router: '/dashboard/clients',
                },
                {
                    name: 'Pojazdy',
                    icon: 'truck',
                    router: '/dashboard/vehicles',
                },
            ],
        },
        {
            name: 'System',
            description: '',
            children: [
                {
                    name: 'Users',
                    icon: 'users',
                    router: '/dashboard/users',
                },
            ],
        },
    ];

    /***************  CONSTRUCTOR  ***************/

    constructor(private store: Store<{ sidemenu: SideMenuState }>) {}

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnInit(): void {
        this.sideMenu$ = this.store.select('sidemenu').subscribe(({ mobile, show }) => {
            this.mobile = mobile;
            this.show = show;
        });
    }

    ngOnDestroy(): void {
        this.sideMenu$.unsubscribe();
    }

    /***************  METHODS   ***************/

    closeMenu(): void {
        this.store.dispatch(closeMenu());
    }

    linkClick(): void {
        if (this.mobile) {
            this.store.dispatch(closeMenu());
        }
    }
}
