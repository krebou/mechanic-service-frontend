import { InjectionToken } from '@angular/core';

export const REPAIR_STATUS = new InjectionToken<string[]>('repair-types', {
    factory() {
        return ['processing', 'pending-pay', 'completed', 'cancelled', 'on-hold', 'check-draft'];
    },
});
