import { Product } from './../../modelo/product';
import { ProductService } from './../../services/product.service';
import { MenuController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  //product: Product = new Product();
  product: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private menu: MenuController,
    private productService: ProductService
  ) { 
    route.queryParams.subscribe(params =>{
      console.log("PARAMETROS PRODUCT-DETAIL: ", params.productDetalle);
      //this.product = new Product();
      //this.product = params.productDetalle;
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.product = this.router.getCurrentNavigation().extras.queryParams.productDetalle;
        console.log("PRODUCT-DETAIL: ", this.product);
      }
    })
  }

  ngOnInit() {
  }

}
