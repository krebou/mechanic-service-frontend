import { InjectionToken } from '@angular/core';
import { ActionButtonMenuInterface } from '../interface/action-button-menu.interface';

export const ACTION_BUTTON_MENU = new InjectionToken<ActionButtonMenuInterface[]>(
    'action-button-menu',
    {
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
    }
);
