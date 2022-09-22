import { Component, OnDestroy, OnInit } from '@angular/core';
import { SideMenuState } from './store/sidemenu.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { closeMenu } from './store/sidemenu.action';

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
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss'],
})
export class SidemenuComponent implements OnInit, OnDestroy {
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
            description: 'Lorem ipsum amet',
            children: [
                {
                    name: 'Users',
                    icon: 'users',
                    router: '/dashboard/users',
                },
                {
                    name: 'Login',
                    icon: 'key',
                    router: '/login',
                },
            ],
        },
    ];

    constructor(private store: Store<{ sidemenu: SideMenuState }>) {}

    ngOnInit(): void {
        this.sideMenu$ = this.store.select('sidemenu').subscribe(({ mobile, show }) => {
            this.mobile = mobile;
            this.show = show;
        });
    }

    closeMenu(): void {
        this.store.dispatch(closeMenu());
    }

    linkClick(): void {
        if (this.mobile) {
            this.store.dispatch(closeMenu());
        }
    }

    ngOnDestroy(): void {
        this.sideMenu$.unsubscribe();
    }
}
