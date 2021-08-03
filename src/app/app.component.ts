import { AdminMainPage } from './admin/admin-main/admin-main.page';
import { UserMainPage } from './usuario/user-main/user-main.page';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { Persona } from './modelo/persona';
import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MenuController, NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Inicio', url: '/folder/Inbox', icon: 'home' },
    { title: 'Mis Direcciones', url: '/folder/Outbox', icon: 'location' },
    { title: 'Mi Cuenta', url: '/folder/Archived', icon: 'person' },
    { title: 'Mis Pedidos', url: '/folder/Trash', icon: 'book' },
  ];

  nombre: string;
  apellido: string;
  email: string;
  image: any;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private menu: MenuController,
    public afs: AngularFirestore,
  ) {
    /** Se recupera lo parametros atraves de la navegacion **/
    route.queryParams.subscribe(params => {
      console.log("Parametros: ", params)
      this.nombre = params.nombre;
      this.apellido = params.apellido;
      this.email = params.email;
      this.image =  params.imagen ;
      console.log("IMAGEN: ", this.image);
    });
  }

  user: Persona = new Persona();

  onLogout() {
    console.log("logout");
    this.afAuth.signOut();
    this.router.navigate(["iniciar-sesion"]);
    this.menu.close(); // Se cierra el sidemenu

  }
}
