import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Persona } from './../../modelo/persona';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registerForm: FormGroup;
  message: Persona = new Persona();

  ValidationMessage = {
    email: [
      { type: "required", message: "El email es requerido" },
      { type: "pattern", message: "No es un email valido" },
    ],
    password: [
      { type: "minLength", message: "La contraseña es muy corta" },
      { type: "required", message: "La contraseña es requerido" },
    ],
    name:[
      {type: "minLength", message: "El nombre deben tener minimo 10 caracteres"},
      { type: "required", message: "Campo requerido" },
    ],
    lastname:[
      {type: "minLength", message: "El apellido deben tener minimo 10 caracteres"},
      { type: "required", message: "Campo requerido" },
    ],
    direccion:[
      {type: "minLength", message: "Debe ingresar Calle Principal y Calle Secundaria"},
      { type: "required", message: "Campo requerido" },
    ],
    number:[
      {type: "minLength", message: "El numero de telefono debe tener 10 digitos"},
      { type: "required", message: "Campo requerido" },
    ],
  };

  uid: string; //identificador del documento
  user: Persona = new Persona();
  terms: boolean;
  contactos: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private contactService: UsersService,
    public toastController: ToastController,
    public alertController: AlertController,
    public menuCtrl: MenuController
    ) { 
      this.registerForm = this.formBuilder.group({
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
        name: new FormControl(
          "",
          Validators.compose([Validators.required, Validators.minLength(3)])
        ),
        lastname: new FormControl(
          "",
          Validators.compose([Validators.required, Validators.minLength(3)])
        ),
        direccion: new FormControl(
          "",
          Validators.compose([Validators.required, Validators.minLength(5)])
        ),
        number: new FormControl(
          "",
          Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])
        ),
        //valor por default y validacion
      });
  
      this.menuCtrl.enable(false);
      this.route.queryParams.subscribe((params) => {
        console.log(params);
        if (this.router.getCurrentNavigation().extras.queryParams) {
          this.user = this.router.getCurrentNavigation().extras.queryParams.contacto;
          console.log(this.user);
        }
      });
    }

  ngOnInit() {
  }

  // Valida que sea un correo electronico
  async validarCorreo(){
    console.log(this.user.email);
    this.contactService.getContactoCorreo(this.user.email).then(data => {
      //console.log("Objeto persona", data.email);
       const aux: any = data
       this.message = aux;
       if(aux.hasOwnProperty('email'))
          console.log("Recupera Correo", aux);
       else
          console.log("Prueba else")
          return aux;
    })

  }
  
  async guardar() {
    console.log("Entro guardar");
    /*this.contactService
      .getContactoCorreo(this.user.email)
      .then(async (data) => {
        const aux: any = data;
        this.message = aux;
        if (aux === undefined) {
          
          this.contactService.saveContacto(this.user);  
          console.log('Successfully created!');
        } else {
          console.log("El usuario existe");
          const toast = this.toastController.create({
            message: "El correo Ingresado ya esta registrado",
            duration: 2000,
          });
          (await toast).present();
        }
      });*/
      await this.authService.onRegister(this.user.email, this.user.password); // registra al usuario por email y contrasena
      
      this.router.navigate(["iniciar-sesion"]);
  }

  back() {
    this.router.navigate(["/iniciar-sesion"]);
  }
}
