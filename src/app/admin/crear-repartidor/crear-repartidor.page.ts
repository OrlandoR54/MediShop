import { DeliveryrestService } from './../../services/deliveryrest.service';
import { AlertController, ToastController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryRest } from './../../modelo/deliveryrest';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crear-repartidor',
  templateUrl: './crear-repartidor.page.html',
  styleUrls: ['./crear-repartidor.page.scss'],
})
export class CrearRepartidorPage implements OnInit {

 repartidor: DeliveryRest = new DeliveryRest();

 repartidores: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    public menuCtrl: MenuController,
    private repartidorServ: DeliveryrestService
    ) { 
      route.queryParams.subscribe(params => {
        console.log(params);
        this.repartidor = new DeliveryRest();

        if (this.router.getCurrentNavigation().extras.queryParams) {
          this.repartidor = this.router.getCurrentNavigation().extras.queryParams.repartidor;
          console.log(this.repartidor);
        }
      })
    }

  ngOnInit() {
  }

  guardar(){
    console.log(this.repartidor);
    this.repartidorServ.save(this.repartidor).subscribe(data => {
      console.log(data);
    });
    this.router.navigate(['show-repartidor'])
    
  }

}
