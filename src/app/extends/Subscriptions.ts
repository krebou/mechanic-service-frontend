import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class Subscriptions implements OnDestroy {
    protected subscriptions = new Subscription();

    set addSubscription(sub: any) {
        this.subscriptions.add(sub);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
