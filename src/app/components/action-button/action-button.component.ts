import { Component, EventEmitter, Inject, InjectionToken, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatMenuModule,
} from '../../modules/angular-material/angular-material.module';
import { FeatherIconComponent } from '../feather-icon/feather-icon.component';

export interface BUTTON_MENU {
    action: string;
    button: string;
}

export const ACTION_BUTTON_MENU = new InjectionToken<BUTTON_MENU[]>('action-button-menu', {
    factory: () => {
        return [
            {
                action: 'edit',
                button: 'EDYTUJ',
            },
            {
                action: 'delete',
                button: 'USUŃ',
            },
        ];
    },
});

@Component({
    selector: 'app-action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.scss'],
    standalone: true,
    imports: [CommonModule, FeatherIconComponent, MatButtonModule, MatMenuModule],
})
export class ActionButtonComponent {
    @Output() private action = new EventEmitter<string>();
    constructor(@Inject(ACTION_BUTTON_MENU) public menuList: any) {}

    makeAction(name: string): void {
        this.action.emit(name);
    }
}
