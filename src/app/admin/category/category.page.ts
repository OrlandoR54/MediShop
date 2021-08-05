import { ProductService } from './../../services/product.service';
import { MenuController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  @ViewChild('catProduct') inputCatProducto: ElementRef;
  categorias: any;
  
  array = [];

  constructor(
    private router: Router,
    private menu: MenuController,
    private productService: ProductService
  ) { }

  ngOnInit() {
    
    this.categorias = this.productService.getCategories();
  
  }

 
  editar(categoria: any){
    let params: NavigationExtras = {
      queryParams: {
        categoria: categoria
      }
    }
    console.log("CATEGORIA: ", params);
    this.router.navigate(['create-category'], params)
  }
  
  crear(){
    this.router.navigate(['create-category'])
  }
  

  /** Habilita y abre el Menu ADMIN **/
  openCustom() {
    this.menu.enable(true, "admin-menu");
    this.menu.open("admin-menu");
  }
}
