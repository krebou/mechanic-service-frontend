import {CarsListComponent} from "./cars-list/cars-list.component";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title:'Lista samochodów',
    component: CarsListComponent,
  },
  {
    path: 'edit',
    title: 'Edit Car: Plate 242424',
    component: CarsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule{ }
