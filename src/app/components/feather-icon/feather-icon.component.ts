import { Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type IconSize = 'small' | 'default' | 'big';

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
    templateUrl: './feather-icon.component.html',
    styleUrls: ['./feather-icon.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class FeatherIconComponent {
    @Input() icon: string = '';
    @Input() size: IconSize = 'default';
    @Input() color: IconColor = 'default';

    constructor() {}
}
