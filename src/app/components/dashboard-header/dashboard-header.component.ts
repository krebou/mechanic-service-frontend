import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { ProgressBarState } from './store/progress-bar.reducer';
import { Store } from '@ngrx/store';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard-header',
    templateUrl: './dashboard-header.component.html',
    styleUrls: ['./dashboard-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, RouterModule, FeatherIconComponent],
})
export class DashboardHeaderComponent implements OnInit {
    @Input() subtitle!: string;
    @Input()
    set title(value: string) {
        this._title = value;
    }
    get title() {
        return this._title !== undefined ? this._title : this.titleService.getTitle();
    }
    private _title!: string;

    navi: Array<{ title: string; slug: string; url: string }> = [];

    constructor(
        private titleService: Title,
        private routeService: ActivatedRoute,
        private readonly store: Store<{ progressbar: ProgressBarState }>
    ) {}

    ngOnInit() {
        this.generateNavbar();
    }

    generateNavbar(): void {
        let _path = '';
        this.routeService.snapshot.pathFromRoot.forEach(
            (value: ActivatedRouteSnapshot, index: number) => {
                if (index > 0 && value.routeConfig?.title !== undefined) {
                    _path += '/' + (value.routeConfig?.path || '');
                    this.navi.push({
                        title: `${value.routeConfig?.title}` || '',
                        slug: value.routeConfig?.path || '',
                        url: _path,
                    });
                }
            }
        );
    }

    private static isDashboard(parent: ActivatedRouteSnapshot): boolean {
        return parent.routeConfig?.path === 'dashboard';
    }
}
