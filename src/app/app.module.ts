import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ShareModule} from "./share/share.module";
import { TestComponent } from './test/test.component';
import {StoreModule} from "@ngrx/store";
import {snackbarReducer} from "./snackbar/store/snackbar.reducer";
import {EffectsModule} from "@ngrx/effects";
import {SnackbarEffects} from "./snackbar/store/snackbar.effects";

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ShareModule,
    StoreModule.forRoot({
      snackbar: snackbarReducer
    }),
    EffectsModule.forRoot([SnackbarEffects]),
  ],
  exports: [
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
