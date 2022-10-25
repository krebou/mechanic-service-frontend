import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatFormModule,
    MatProgressSpinnerModule,
} from '../../modules/angular-material/angular-material.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormModule,
        MatProgressSpinnerModule,
    ],
})
export class LoginModule {}
