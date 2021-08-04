import { AuthService } from './../../services/auth.service';
import { Persona } from './../../modelo/persona';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
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

  public user;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private menuController: MenuController
    ) {
    route.queryParams.subscribe(params =>{
      console.log(params);
      this.persona = new Persona();
      //this.contacto = params.contacto;
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.persona = this.router.getCurrentNavigation().extras.queryParams.people;
        console.log(this.persona);
      }
    })
   }


  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    console.log("Usuario ACTUAL: ", this.user);
    this.menuController.enable(true);
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

}
