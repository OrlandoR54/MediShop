import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from './../../modelo/persona';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit,OnDestroy, PLATFORM_ID} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { trace } from '@angular/fire/performance';
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
//import { Storage } from "@ionic/storage";
import { MenuController} from '@ionic/angular';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  loginForm: FormGroup;

  ValidationMessage = {
    email: [
      { type: "required", message: "El email es requerido" },
      { type: "pattern", message: "No es un email valido" },
    ],
    password: [
      { type: "minLength", message: "La contraseña es muy corta" },
      { type: "required", message: "La contraseña es requerido" },
    ],
  };

  user: Persona = new Persona();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    //private storage: Storage,
    public afs: AngularFirestore,
    public toastController: ToastController,
    private authService: AuthService,
    public alertController: AlertController,
    public readonly afAuth: AngularFireAuth, 
    @Inject(PLATFORM_ID) platformId: object,
    public menu: MenuController
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"),
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      //valor por default y validacion
    });

    if (!isPlatformServer(platformId)) {
      this.userDisposable = this.afAuth.authState.pipe(
        trace('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }

    this.menu.enable(false); // Se cierra el sidemenu
  }

  ngOnInit() {
    
  }

  image: any;

  async onLogin() {
    
    let persona = [];
    let usuarios = [];
     
    /** Crea un mensaje */
    const toast = this.toastController.create({
      message: `Verificando credenciales`,
      duration: 3000,
    });

    (await toast).present(); // Muestra el mensaje

    const login = await this.authService.onLogin(this.user.email, this.user.password); // Inicia al usuario con Email & Password

    this.getDataEmailPass().subscribe(async (dato) => {

      usuarios = dato; // Guarda el resultado obtenido de dato en el array usuarios

      console.log("Vector Usuario: ", usuarios[0].photoURL);

      if (usuarios.length == 1) { // Verifica si existe un usuario
        console.log("El usuario si existe");

          if (usuarios[0].rol === "repartidor") { // Condicional si es repartidor
            const toast = this.toastController.create({
              message: `Bienvenido: ${usuarios[0].displayName}`,
              duration: 2000,
            });
            (await toast).present();
            ////
            let person: Persona = persona[0];
            delete person.password;
            //.set("persona", persona[0]);
            /////
            this.router.navigate(["/menu-teacher/home"]);

          } else if (usuarios[0].rol === "usuario") { // Condicional si es usuario

            const toast = this.toastController.create({
              message: `Bienvenido  ${usuarios[0].displayName}`,
              duration: 2000,
            });
            (await toast).present();
            ////
            let person: Persona =usuarios[0];
            delete person.password;
            //this.storage.set("persona", persona[0]);
            
             /** Se manda parametros a otra pagina  **/
            let params: NavigationExtras = {
              queryParams:{
                //people: usuarios[0],
                nombre: usuarios[0].displayName,
                apellido: usuarios[0].lastname,
                email: usuarios[0].email,
                imagen: usuarios[0].photoURL
              }
            }
            this.router.navigate(["user-main"], params); // Redirige a la pagina user-main y pasa parametros

            
            
          }else if (usuarios[0].rol === "admin") {
            console.log("Entra ADMIN")
            this.router.navigate(["admin-main"]); // Redirige a la pagina user-main y pasa parametros
          }
        } else {
        const toast = this.toastController.create({
          message: "Credenciales incorrectas",
          duration: 2000,
        });
        (await toast).present();
      }
     

    });
    /** Verifica la tabla Usuarios 
     *  Se comprueba si el usuario tiene credenciales y si esta activo
     */
   /* this.verificarDatos().subscribe(async (data) => {

      persona = data; // Guarda el resultado obtenido de data en el array persona

      if (persona.length == 1) { // Verifica si existe un usuario
        console.log("El usuario si existe");

        if (persona[0].deleted === true) { // Verifica si el usuario esta activo
          const toast = this.toastController.create({
            message: `Su cuenta ha sido desactivada`,
            duration: 2000,
          });
          (await toast).present();

        } else {
          if (persona[0].rol === "repartidor") { // Condicional si es repartidor
            const toast = this.toastController.create({
              message: `Bienvenido: ${persona[0].displayName}`,
              duration: 2000,
            });
            (await toast).present();
            ////
            let person: Persona = persona[0];
            delete person.password;
            //.set("persona", persona[0]);
            /////
            this.router.navigate(["/menu-teacher/home"]);

          } else if (persona[0].rol === "usuario") { // Condicional si es usuario

            const toast = this.toastController.create({
              message: `Bienvenido: ${persona[0].displayName}`,
              duration: 2000,
            });
            (await toast).present();
            ////
            let person: Persona = persona[0];
            delete person.password;
            //this.storage.set("persona", persona[0]);
            
            // Verifica la tabala USER

            
            
          }else if (persona[0].rol === "admin") {
            console.log("Entra ADMIN")
            this.router.navigate(["admin-main"]); // Redirige a la pagina user-main y pasa parametros
          }
        }
      } else {
        const toast = this.toastController.create({
          message: "Credenciales incorrectas",
          duration: 2000,
        });
        (await toast).present();
      }
    });*/
    //this.router.navigate(['folder/Inbox']);
  }

  // Verifica los datos Email & Password y devuelve el usuario
  
 /* verificarDatos(): Observable<any[]> {
    console.log(
      "🚀 ~ file: iniciar-sesion.page.ts ~ verificarDatos ~ this.user",
      this.user
    );

    return this.afs
      .collection("usuarios", (ref) =>
        ref
          .where("email", "==", this.user.email)
          .where("password", "==", this.user.password)
      )
      .valueChanges();
  }*/

  /** Obtener El usuario de la tabla User **/
  getDataEmailPass(): Observable<any[]> {
    console.log(
      "🚀  ~ getDataEmailPass ~ this.user",
      this.user
    );

    return this.afs.collection("users", 
      ref => ref.where("email", "==", this.user.email)).valueChanges();
  }

  signUp() {
    this.router.navigate(['registro']);
  }

   // Login Google

   private readonly userDisposable: Subscription|undefined;

   showLoginButton = false;
   showLogoutButton = false;
 
  
 
   ngOnDestroy(): void {
     if (this.userDisposable) {
       this.userDisposable.unsubscribe();
     }
   }
 
   async onLoginGoogle() {
    /* const user = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
     console.log(user);*/
     this.authService.loginGoogle();
     this.router.navigate(["user-main"]);
     // TODO sign into offline app
   }
 
   async loginAnonymously() {
     const user = await this.afAuth.signInAnonymously();
     // TODO sign into offline app
   }
 
   logout() {
     this.afAuth.signOut();
     // TODO sign out of offline app
   }

}
