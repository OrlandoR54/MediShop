import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserMainPageRoutingModule } from './user-main-routing.module';

import { UserMainPage } from './user-main.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserMainPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [UserMainPage]
})
export class UserMainPageModule {}
