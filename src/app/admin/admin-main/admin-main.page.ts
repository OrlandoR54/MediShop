import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.page.html',
  styleUrls: ['./admin-main.page.scss'],
})
export class AdminMainPage implements OnInit {

  constructor(private menu: MenuController) {
    
   }


  ngOnInit() {
  }

  /** Habilita y abre el Menu ADMIN **/
  openCustom() {
    this.menu.enable(true, "admin-menu");
    this.menu.open("admin-menu");
  }

}
