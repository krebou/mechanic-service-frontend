import {ChangeDetectionStrategy, Component, Inject, InjectionToken, Input, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";

// export const DASHBOARD_HEADER_SUBTITLE = new InjectionToken<string>('dashboard_header_subtitle');

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent implements OnInit{

  @Input('subtitle') subtitle!: string;
  @Input('title')
  set title( value: string ){
    this._title = value;
  }
  get title(){
    return ( this._title !== undefined ? this._title : this.titleService.getTitle() );
  }
  private _title!: string;

  navi: Array<{ title: string; slug: string; url: string }> = [];

  constructor(
    private titleService: Title,
    private routeService: ActivatedRoute,
    ) {
  }

  ngOnInit(){
    this.generateNavbar();
  }

  generateNavbar(): void {
    let _path = '';
    this.routeService.snapshot.pathFromRoot.forEach((value: ActivatedRouteSnapshot, index: number) => {

      if( index > 0 && value.routeConfig?.title !== undefined ){
        _path += '/' + (value.routeConfig?.path || '');
        this.navi.push({
          title: `${value.routeConfig?.title}` || '',
          slug: value.routeConfig?.path || '',
          url: _path
        })
      }


    })
  }

  private static isDashboard(parent: ActivatedRouteSnapshot ): boolean{
    return parent.routeConfig?.path === 'dashboard';
  }

}
