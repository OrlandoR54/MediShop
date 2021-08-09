import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  productos: any;
  
  constructor() { }

  ngOnInit() {
     //this.productos = this.productService.getProductos();
     this.productos = JSON.parse(localStorage.getItem('listaProductos'));
     for (let index = 0; index < this.productos.length; index++) {
       this.productos
     }
     console.log(this.productos);
     console.log(this.productos.length);
  }

}
