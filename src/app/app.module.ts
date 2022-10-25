import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { snackbarReducer } from './store/snackbar/snackbar.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SnackbarEffects } from './store/snackbar/snackbar.effects';
import { sidemenuReducer } from './store/sidemenu/sidemenu.reducer';
import { SidemenuEffects } from './store/sidemenu/sidemenu.effect';
import { progressBarReducer } from './store/progress-bar/progress-bar.reducer';
import { HttpClientModule } from '@angular/common/http';
import { AuthEffects } from './store/auth/auth.effects';
import { authReducer } from './store/auth/auth.reducers';
import { AppInitializerModule } from './modules/app-initializer/app-initializer.module';
import { HttpInterceptorsModule } from './modules/http-interceptors/http-interceptors.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        StoreModule.forRoot({
            snackbar: snackbarReducer,
            sidemenu: sidemenuReducer,
            progressbar: progressBarReducer,
            auth: authReducer,
        }),
        EffectsModule.forRoot([SnackbarEffects, SidemenuEffects, AuthEffects]),
        AppInitializerModule,
        HttpInterceptorsModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
