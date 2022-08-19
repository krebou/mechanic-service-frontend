import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ClientsListComponent} from "./clients-list/clients-list.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title:'Lista klientów',
    component: ClientsListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule{ }
