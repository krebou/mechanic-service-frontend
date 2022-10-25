import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatMenuModule,
} from '../../modules/angular-material/angular-material.module';
import { FeatherIconStandaloneComponent } from '../feather-icon/feather-icon.standalone-component';
import { ACTION_BUTTON_MENU } from '../../injectionTokens/action-button-menu.injection-token';

@Component({
    selector: 'app-action-button',
    templateUrl: './action-button.standalone-component.html',
    standalone: true,
    imports: [CommonModule, FeatherIconStandaloneComponent, MatButtonModule, MatMenuModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonStandaloneComponent {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    @Output() public action = new EventEmitter<string>();

    /***************  CONSTRUCTOR  ***************/

    constructor(@Inject(ACTION_BUTTON_MENU) public menuList: any) {}

    /***************  METHODS   ***************/

    makeAction(name: string): void {
        this.action.emit(name);
    }
}
