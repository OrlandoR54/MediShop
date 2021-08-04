import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { EmailValidator } from '@angular/forms';
import { Persona } from './../modelo/persona';
import { Subscription, Observable, of } from 'rxjs';
import firebase from 'firebase/app';
import { switchMap, first } from 'rxjs/operators';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<any>;
  public isLogged: any = false;

  constructor(
    public afAuth: AngularFireAuth, 
    private afs: AngularFirestore,
    private platform: Platform
    ) { 
    afAuth.authState.subscribe(user => (this.isLogged = user));

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Usuario actual
  async getCurrentUser(): Promise<any> {
    return this.user$.pipe(first()).toPromise();
  }


  /******************************* EMAIL & PASSWORD *******************************/

 
  // Register With Email & Password

  async onRegister(email: string, password: string): Promise<any>{
    console.log("Registro Email&Password -> Nombre: ", "Email: ", email)
    try {
      console.log("Auth service - email", email, "Contrasena: ", password);
      this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      /*const user = await this.afAuth.currentUser;
      return await user.updateProfile({
        displayName: name,
        photoURL: "../assets/imagenes/User.png"
      });*/
    } catch (error) {
      console.log('Error on register user: ', error);
    }
  }

  // Password reset

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (err) {
      return err;
    } 
  } 


  // login With Email

  async onLogin (email: string, password: string): Promise<void>{
    console.log("Auth service Login - email",email, "Contrasena: ", password);
    try {
      const firebaseUser = await this.afAuth.signInWithEmailAndPassword(email, password)
      return await this.updateUserData(firebaseUser.user, "email");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error on login: ', error);
    }
  }

  // Email Verification

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log("Error->", error);
    }
  }

  // Logout 
  async logout(): Promise<any> {
    return this.afAuth.signOut();
  } 


  /******************************* LOGIN WITH GOOGLE *******************************/

  // Login Google

 async loginGoogle(): Promise<any> {
   try {
     const google = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
     return await this.updateUserData(google.user, "google");
   } catch (error) {
     console.log("Error ->", error);
   }
  /*if (this.platform.is("cordova")) {
    return await this.nativeGoogleLogin();
  } else {
    return await this.webGoogleLogin();
  }*/
 }


 userExists(email: string) {
  console.log("User: " + email + "exists");
  return this.afs
    .collection("users", ref => ref.where("email", "==", email))
    .valueChanges()
    .pipe(first())
    .toPromise();
 }


 // Guardar datos del usuario en Firestore

 async updateUserData(usertemp: any, provider: any) {
  
  //const userRef = this.afs.collection<any>('users');
  const userRef: AngularFirestoreDocument<Persona> = this.afs.doc(`users/${usertemp.uid}`);
  console.log("Update" + JSON.stringify(usertemp));
  const doc: any = await this.userExists(usertemp.email);
  console.log("doc" + JSON.stringify(doc));
  let data: any;
  let user: any = JSON.parse(JSON.stringify(usertemp));

  console.log("doc" + JSON.stringify(doc));
  if (doc == null || doc == "") {
    //Crear cuenta
    data = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || '',
      photoURL: user.photoURL || "../assets/imagenes/User.png",
      provider: provider,
      rol: "usuario",
      lastLogin: new Date(Number(user.lastLoginAt)) || new Date(),
      createdAt: new Date(Number(user.createdAt)) || new Date()
    };
  } else if (doc.active == false) {
    throw { error_code: 999, error_message: "Acceso denegado, servicio deshabilitado, consulte con el administrador." };
  } else {
    //Actualizar cuenta
    data = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || '',
      photoURL: user.photoURL || "../assets/imagenes/User.png",
      provider: provider,
      rol: "usuario",
      lastLogin: new Date(Number(user.lastLoginAt)) || new Date()
    };
  }

  console.log("data", JSON.stringify(data))

  //return userRef.doc(`${user.uid}`).set(data, { merge: true });

  return userRef.set(data, { merge: true });
} 

}
