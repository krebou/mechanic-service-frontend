import { Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type IconSize = 'small' | 'default' | 'big' | 'xxl';

type IconColor =
    | 'default'
    | 'white'
    | 'primary'
    | 'warn'
    | 'success'
    | 'accent'
    | 'theme1'
    | 'theme2'
    | 'theme3'
    | 'theme4';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'feather-icon',
    templateUrl: './feather-icon.standalone-component.html',
    styleUrls: ['./feather-icon.standalone-component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class FeatherIconStandaloneComponent {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @Input() icon: string = '';
    @Input() size: IconSize = 'default';
    @Input() color: IconColor = 'default';
}
