import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { snackbarReducer } from './components/snackbar/store/snackbar.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SnackbarEffects } from './components/snackbar/store/snackbar.effects';
import { sidemenuReducer } from './components/dashboard/sidemenu/store/sidemenu.reducer';
import { SidemenuEffects } from './components/dashboard/sidemenu/store/sidemenu.effect';
import { progressBarReducer } from './components/dashboard-header/store/progress-bar.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpLoadingStatusInterceptor } from './interceptor/http-loading-status/http-loading-status.interceptor';

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
        }),
        EffectsModule.forRoot([SnackbarEffects, SidemenuEffects]),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoadingStatusInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
