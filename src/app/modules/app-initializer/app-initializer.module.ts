import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { authLogin } from '../../store/auth/auth.actions';

@NgModule({
    providers: [
        {
            provide: APP_INITIALIZER,
            multi: true,
            useFactory: (store: Store, authService: AuthService) => (): Promise<void> =>
                new Promise((resolve) => {
                    if (localStorage.getItem('auth_token')) {
                        authService
                            .getAuth(localStorage.getItem('auth_token') || '')
                            .pipe(finalize(() => resolve()))
                            .subscribe({
                                next: (res) => {
                                    store.dispatch(
                                        authLogin({
                                            token: res.token,
                                            user: {
                                                email: res.user.email,
                                                id: String(res.user.id),
                                                firstname: res.user.firstname,
                                                role: res.user.role,
                                            },
                                            redirect: false,
                                        })
                                    );
                                },
                            });
                    } else {
                        resolve();
                    }
                }),
            deps: [Store, AuthService],
        },
    ],
})
export class AppInitializerModule {}
