import {Input, Component} from '@angular/core';

type IconSize = 'small' | 'default' | 'big';

type IconColor = 'default' | 'white' | 'primary' | 'warn' | 'success' | 'accent' | 'theme1' | 'theme2' | 'theme3' | 'theme4';

@Component({
  selector: 'feather-icon',
  templateUrl: './feather-icon.component.html',
  styleUrls: ['./feather-icon.component.scss']
})
export class FeatherIconComponent{

  @Input() icon: string = '';
  @Input() size: IconSize =  'default';
  @Input() color: IconColor =  'default';

  constructor() {
  }

}
