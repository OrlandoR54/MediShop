import { Product } from './../../modelo/product';
import { ProductService } from './../../services/product.service';
import { MenuController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  //product: Product = new Product();
  product: any;
  public carritos:Array<any>=[];
  public carritoNumeroItems = new BehaviorSubject(0);

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

  agregar(producto:any){
    
    this.carritos.push(producto);
    for (let p of this.carritos) {
      p.stock += 1;
      //agregado = true;
      localStorage.setItem('listaProductos', JSON.stringify(this.carritos))
      
    }

    this.carritoNumeroItems.next(this.carritoNumeroItems.value + 1);
    
    let params: NavigationExtras = {
      queryParams:{
        productos: this.carritos
      }
    }
    this.router.navigate(["carrito"], params);
    this.router.navigate(["user-main"]);
  }

  obtenerCarrito(){
    return this.carritos;
  }

  obtenerCarritoNumeroItems(){
    return this.carritoNumeroItems;
  }

  bajarCantidaProducto(product){
    for (let [index, p] of this.carritos.entries()) {
      if (p.uid === product.uid) {
        p.stock -= 1; if (p.stock == 0) {
          this.carritos.splice(index, 1);
        }
      }
      
    }
    this.carritoNumeroItems.next(this.carritoNumeroItems.value - 1);
  }


  eliminarProducto(product) {
    for (let [index, p] of this.carritos.entries()) {
      if (p.uid === product.uid) {
        this.carritoNumeroItems.next(this.carritoNumeroItems.value - p.stock);
        this.carritos.splice(index, 1);
      }
      
    }
  }
}
