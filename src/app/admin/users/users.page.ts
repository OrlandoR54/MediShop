import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  usuarios: any;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

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

}
