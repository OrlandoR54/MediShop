import { MenuController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  public user;

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    console.log("Usuario ACTUAL: ", this.user);
  }

  onLogout(){

  }

  closeMenu() {
    this.menuController.close();
  }
  logout() {
    //this.storage.set("persona", undefined);
    this.router.navigate(["/sign-in-option"]);
    this.closeMenu();
  }
  btnCreateCourse() {
    this.router.navigate(["/menu-teacher/create"]);
    this.closeMenu();
  }
  btnModificarTeacher() {
    this.router.navigate(["/menu-teacher/modificarTeacher"]);
    this.closeMenu();
  }
  home() {
    this.router.navigate(["/menu-teacher/home"]);
    this.closeMenu();
  }
  btnVerCursos() {
    this.router.navigate(["/menu-teacher/listar-cursos"]);
    this.closeMenu();
  }
  btnVerCompletos() {
    this.router.navigate(["/menu-teacher/curso-completado"]);
    this.closeMenu();
  }

}
