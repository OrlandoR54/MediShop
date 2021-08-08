import { ProductService } from './../../services/product.service';
import { AuthService } from './../../services/auth.service';
import { Persona } from './../../modelo/persona';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.page.html',
  styleUrls: ['./user-main.page.scss'],
})
export class UserMainPage implements OnInit {

  searchTerm: string;

  persona: Persona = new Persona();

  catSlideOpts = {
    freeMode: true,
    slidesPerView: 3.5,
    slidesOffsetBefore: 11,
    spaceBetween: 10
  };

  prodSlideOpts = {
    freeMode: true,
    slidesPerView: 2.3,
    slidesOffsetBefore: 11,
    spaceBetween: 10
  };

  highlightSlideOpts =  {
    slidesPerView: 1.05,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true
  };

  featuredSlideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    freeMode: true
  };

  public highlights = [
    { url: '../assets/imagenes/Banner-2.gif'},
    { url: '../assets/imagenes/Banner-1.png'},
    { url: '../assets/imagenes/Banner-3.gif'},
  ];

  showLocationDetail = false;

  nutricionUID:string = "UDCqU3uI4TIRA7SmH9zM";
  proteinUID:string = "qDTUkYvI6PViiZf4YeK6";

  

  user: any;
  productDetail: any;
  productos: any;   // Todos los productos
  categories: any;  // Todas las categorias
  proteinas: any;   // Todos los productos de la categoria proteina
  nutricion: any;   // Todos los productos de la categoria nutricion

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private menu: MenuController,
    private navCtrl: NavController,
    private productService: ProductService
    ) {
    route.queryParams.subscribe(params =>{
      console.log("PARAMETROS USER-MAIN: ", params);
      this.persona = new Persona();
      //this.contacto = params.contacto;
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.persona = this.router.getCurrentNavigation().extras.queryParams.people;
        console.log("USER-MAIN: ", this.persona);
      }
    })
    
   }


  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    console.log("Usuario ACTUAL: ", this.user);

    //this.menuController.enable(true);
    this.productos = this.productService.getProductActive();
    this.categories = this.productService.getCategoriesActive();
    console.log("Productos: ", this.productos);

    /** Productos por categorias **/
    this.proteinas = this.productService.getProdCat(this.proteinUID);
    this.nutricion = this.productService.getProdCat(this.nutricionUID);
    
  }

  
  doRefresh(ev) {
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
  }

  onScroll(ev) {
    const offset = ev.detail.scrollTop;
    this.showLocationDetail = offset > 50;
  }

  openFirst() {
    //this.menu.get("user-menu");
    this.menu.enable(true, "user-menu");
    this.menu.open("user-menu");
     /** Se manda parametros a otra pagina  **/
     let params: NavigationExtras = {
      queryParams:{
        people: this.persona,
        /*nombre: usuarios[0].displayName,
        apellido: usuarios[0].lastname,
        email: usuarios[0].email,
        imagen: usuarios[0].photoURL*/
      }
    }
  }

  /********** PRODUCTOS POR CATEGORIAS **********/

  prodct_cat: any;

  showCategory(uid:string, name:string){
    this.prodct_cat = this.productService.getProdCat(uid);
    let params: NavigationExtras = {
      queryParams:{
        prod_cat: this.prodct_cat,
        categoriaUID: name
      }
    }
    this.router.navigate(['product-x-cat'], params);
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
