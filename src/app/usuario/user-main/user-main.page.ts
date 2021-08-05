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

  persona: Persona = new Persona();

  catSlideOpts = {
    freeMode: true,
    slidesPerView: 3.5,
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

  showLocationDetail = false;

  user: any;
  productos: any;
  categories: any;

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

}
