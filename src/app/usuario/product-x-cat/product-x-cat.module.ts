import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductXCatPageRoutingModule } from './product-x-cat-routing.module';

import { ProductXCatPage } from './product-x-cat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductXCatPageRoutingModule
  ],
  declarations: [ProductXCatPage]
})
export class ProductXCatPageModule {}
