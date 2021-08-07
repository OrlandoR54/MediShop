import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  searchTerm: string;
  productos: any;

  constructor(
    public alertController: AlertController,
    private router: Router,
    private menu: MenuController,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productos = this.productService.getProductos();
  }

  editar(producto: any){
    let params: NavigationExtras = {
      queryParams: {
        producto: producto
      }
    }
    this.router.navigate(['create-product'], params)
  }

  crear(){
    this.router.navigate(['create-product'])
  }

   /** Habilita y abre el Menu ADMIN **/
   openCustom() {
    this.menu.enable(true, "admin-menu");
    this.menu.open("admin-menu");
  }

}
