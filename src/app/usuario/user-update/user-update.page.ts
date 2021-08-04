import { UsersService } from './../../services/users.service';
import { Persona } from './../../modelo/persona';
import { ToastController, MenuController, AlertController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.page.html',
  styleUrls: ['./user-update.page.scss'],
})
export class UserUpdatePage implements OnInit {


  persona: Persona = new Persona();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private contactService: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public menuCtrl: MenuController
    ) { 
      route.queryParams.subscribe(params =>{
        console.log(params);
        this.persona = new Persona();
        //this.contacto = params.contacto;
        if (this.router.getCurrentNavigation().extras.queryParams) {
          this.persona = this.router.getCurrentNavigation().extras.queryParams.people;
          console.log(this.persona);
        }
      });

      this.menuCtrl.enable(false);
      
    }

  ngOnInit() {
  }


  back(){
    this.router.navigate(['user-main'])
  }

}
