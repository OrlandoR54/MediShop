import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowRepartidorPageRoutingModule } from './show-repartidor-routing.module';

import { ShowRepartidorPage } from './show-repartidor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowRepartidorPageRoutingModule
  ],
  declarations: [ShowRepartidorPage]
})
export class ShowRepartidorPageModule {}
