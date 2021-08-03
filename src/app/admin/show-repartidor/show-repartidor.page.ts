import { DeliveryrestService } from './../../services/deliveryrest.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-show-repartidor',
  templateUrl: './show-repartidor.page.html',
  styleUrls: ['./show-repartidor.page.scss'],
})
export class ShowRepartidorPage implements OnInit {

  repartidores: any;

  constructor(
    private router: Router,
    private repartidorServ: DeliveryrestService  
  ) { }

  ngOnInit() {
    this.repartidores = this.repartidorServ.getDeliveryMan();
  }

  editar(repartidor: any){
    let params: NavigationExtras = { 
      queryParams: {
        repartidor: repartidor
      }
    }

    this.router.navigate(['crear-repartidor'], params);
  }

  crear(){
    this.router.navigate(['crear-repartidor']);
  }
}
