import { LocationService } from './../../services/location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {


  zoom = 15;

  lat = -2.8926741122288733; 
  lng = -78.98596970804189;

  currentLocation: any;
  centerLocation: any = {
    latitude: null,
    longitude: null,
  }

  icons = {
    client: "https://cdn1.iconfinder.com/data/icons/ecommerce-61/48/eccomerce_-_location-48.png",
    shop: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Outside-Chartreuse.png",
    center: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Marker-Inside-Chartreuse.png",
    pointer: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/48/Map-Marker-Ball-Azure.png"
  };

  constructor(private locationService: LocationService) { }

  async ngOnInit() {
    this.currentLocation = await this.locationService.getCurrentLocation();
    console.log(this.currentLocation);
  }

  newAddress(event: any){
    if (event) {
      this.centerLocation.latitude = event.lat;
      this.centerLocation.longitude = event.lng;
      this.locationService.getAddressOfLocation(this.centerLocation);
      console.log(this.centerLocation);
    }
  }
}
