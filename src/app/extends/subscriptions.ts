import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class Subscriptions implements OnDestroy {
    /***************  GETTERS / SETTERS / INPUTES / OUTPUTES ETC.  ***************/

    protected subscriptions = new Subscription();

    set addSubscription(sub: any) {
        this.subscriptions.add(sub);
    }

    /***************  LIFE-CYCLES COMPONENT   ***************/

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
