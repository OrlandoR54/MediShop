import { UsersService } from './../../services/users.service';
import { Persona } from './../../modelo/persona';
import { ToastController, MenuController, AlertController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {


  persona: Persona = new Persona();
  user: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private contactService: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public menuCtrl: MenuController
    ) { 
      /*route.queryParams.subscribe(params =>{
        console.log(params);
        this.persona = new Persona();
        //this.persona = params.people;
      
        //if (this.router.getCurrentNavigation().extras.queryParams) {
         // this.persona = this.router.getCurrentNavigation().extras.queryParams.people;
         // console.log("USER-UPDATE: ", this.persona);
        //}
      });*/

      this.user = this.authService.getCurrentUser().then(data => {this.persona = data;});

      this.menuCtrl.enable(false);
      
    }
  
  ngOnInit() {
  }

  update(){
    this.contactService.saveContacto(this.persona);
  }

  back(){
    this.router.navigate(['user-main'])
  }

}
