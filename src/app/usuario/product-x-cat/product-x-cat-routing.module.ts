import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductXCatPage } from './product-x-cat.page';

const routes: Routes = [
  {
    path: '',
    component: ProductXCatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductXCatPageRoutingModule {}
