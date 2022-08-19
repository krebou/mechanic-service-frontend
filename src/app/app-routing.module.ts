import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TestComponent} from "./test/test.component";

const routes: Routes = [
  {
    path:'',
    component: TestComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./core/dashboard/dashboard.module' ).then(m => m.DashboardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
