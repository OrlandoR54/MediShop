import { MenuController } from '@ionic/angular';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  searchTerm: string;
  usuarios: any;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private menu: MenuController
  ) { }

  filterPost = '';

  ngOnInit() {
    this.usuarios = this.usersService.getUsuarios();
  }

  editar(usuarios: any){
    let params: NavigationExtras = {
      queryParams: {
        producto: usuarios
      }
    }
    this.router.navigate([''], params)
  }

  crear(){
    this.router.navigate([''])
  }

  /** Habilita y abre el Menu ADMIN **/
  openCustom() {
    this.menu.enable(true, "admin-menu");
    this.menu.open("admin-menu");
  }


}
