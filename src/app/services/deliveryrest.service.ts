import { environment } from './../../environments/environment';
import { DeliveryRest } from './../modelo/deliveryrest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryrestService {

  constructor(private http: HttpClient) { }

  save(delivery: DeliveryRest): Observable<any>{
    console.log(delivery);
    let url = environment.WS_PATH + "/personas";
    console.log(url)
    return this.http.post<any>(url, delivery)
  }

  getDeliveryMan(): Observable<any[]>{
    return this.http.get<any>(environment.WS_PATH + "/personas")
  }
}
