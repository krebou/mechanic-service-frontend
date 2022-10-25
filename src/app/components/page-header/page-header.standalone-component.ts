import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FeatherIconStandaloneComponent } from '../feather-icon/feather-icon.standalone-component';
import { CommonModule } from '@angular/common';
import { DashboardHeaderNavi } from '../../interface/dashboard-header-navi.interface';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.standalone-component.html',
    styleUrls: ['./page-header.standalone-component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, RouterModule, FeatherIconStandaloneComponent],
})
export class PageHeaderStandaloneComponent {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @Input() headerNavi!: DashboardHeaderNavi[];
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

    /***************  CONSTRUCTOR  ***************/

    constructor(private titleService: Title) {}
}
