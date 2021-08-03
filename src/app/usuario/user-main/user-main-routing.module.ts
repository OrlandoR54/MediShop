import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserMainPage } from './user-main.page';

const routes: Routes = [
  {
    path: '',
    component: UserMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserMainPageRoutingModule {}
