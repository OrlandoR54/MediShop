import { ProductService } from './../../services/product.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modelo/product';

@Component({
  selector: 'app-product-x-cat',
  templateUrl: './product-x-cat.page.html',
  styleUrls: ['./product-x-cat.page.scss'],
})
export class ProductXCatPage implements OnInit {

  producto: Product = new Product();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    //private authService: AuthService,
    private menu: MenuController,
    //private navCtrl: NavController,
    private productService: ProductService
  ) { 
    route.queryParams.subscribe(params =>{
      console.log("PARAMETROS USER-MAIN: ", params);
      this.producto = new Product();
      //this.contacto = params.contacto;
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.producto = this.router.getCurrentNavigation().extras.queryParams.prod_cat;
        console.log("Product  _Cat: ", this.producto);
      }
    })
  }

  ngOnInit() {
  }

}
