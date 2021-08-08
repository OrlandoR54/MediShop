import { ProductService } from './../../services/product.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modelo/product';

@Component({
  selector: 'app-product-x-cat',
  templateUrl: './product-x-cat.page.html',
  styleUrls: ['./product-x-cat.page.scss'],
})
export class ProductXCatPage implements OnInit {

  producto: Product = new Product();
  productos: any;
  categoriaUID: any;
  productDetail: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    //private authService: AuthService,
    private menu: MenuController,
    //private navCtrl: NavController,
    private productService: ProductService
  ) { 
    route.queryParams.subscribe(params =>{
      console.log("PARAMETROS PRODUCT x CAT: ", params);
      //this.producto = new Product();
      this.categoriaUID = params.categoriaUID;
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.productos = this.router.getCurrentNavigation().extras.queryParams.prod_cat;
    
        console.log("Product  _Cat: ", this.productos);
      }
    })
  }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['user-main'])
  }

  showProduct(uid: string){
    console.log("UID-PRoducto: ", uid)
    this.productDetail = this.productService.getProduct(uid);
    let params: NavigationExtras = {
      queryParams:{
        productDetalle: this.productDetail
      }
    }
    this.router.navigate(["product-detail"], params);
  }

}
