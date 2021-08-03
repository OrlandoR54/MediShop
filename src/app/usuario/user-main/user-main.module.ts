import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserMainPageRoutingModule } from './user-main-routing.module';

import { UserMainPage } from './user-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserMainPageRoutingModule
  ],
  declarations: [UserMainPage]
})
export class UserMainPageModule {}
