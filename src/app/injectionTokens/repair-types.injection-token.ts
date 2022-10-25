import { InjectionToken } from '@angular/core';

export const REPAIR_TYPES = new InjectionToken<string[]>('repair-types', {
    factory() {
        return ['repair', 'clima', 'service', 'other'];
    },
});
