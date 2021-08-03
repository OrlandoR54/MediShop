import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowRepartidorPage } from './show-repartidor.page';

const routes: Routes = [
  {
    path: '',
    component: ShowRepartidorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowRepartidorPageRoutingModule {}
