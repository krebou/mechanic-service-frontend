import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IsNotLoggedGuard } from '../../guards/is-not-logged.guard';

const routes: Routes = [
    {
        path: '',
        title: 'Login',
        component: LoginComponent,
        canActivate: [IsNotLoggedGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LoginRoutingModule {}
