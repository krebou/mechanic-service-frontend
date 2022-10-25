import { InjectionToken } from '@angular/core';
import { TableActionSelection } from '../interface/table-action.interface';

export const TABLE_ACTION_SELECTION = new InjectionToken<TableActionSelection>(
    'table-action-selection',
    {
        factory: () => {
            return {
                button: 'Wykonaj',
                placeholder: 'Wybierz akcje',
                data: [
                    {
                        action: 'delete',
                        button: 'Usuń wybrane',
                    },
                ],
            };
        },
    }
);
