import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.page.html',
  styleUrls: ['./user-menu.page.scss'],
})
export class UserMenuPage implements OnInit {

  public appPages = [
    { title: 'Inicio', url: '/folder/Inbox', icon: 'home' },
    { title: 'Mis Direcciones', url: '/folder/Outbox', icon: 'location' },
    { title: 'Mi Cuenta', url: '/folder/Archived', icon: 'person' },
    { title: 'Mis Pedidos', url: '/folder/Trash', icon: 'book' },
  ];

  constructor() { }

  ngOnInit() {
  }

  onLogout(){

  }

}
