import { Persona } from './../modelo/persona';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public isLogged: any = false;

  constructor(public afs: AngularFirestore) { 
  }

  saveContacto(contacto: Persona){
    const refContacto = this.afs.collection("users");

    if (contacto.uid == null) {
      contacto.uid = this.afs.createId()
      contacto.deleted = false
      contacto.rol = "usuario"
    };

    refContacto
      .doc(contacto.uid)
      .set(Object.assign({}, contacto), { merge: true });
  }

  /** Obtiene los usuarios con rol "usuario" **/
  getSearch(nombre:string): Observable<any[]> {
    return this.afs
      .collection("users", (ref) => ref.where("displayName", "==", nombre)).valueChanges();
  }

  /** Obtiene los usuarios con rol "usuario" **/
  getUsuarios(): Observable<any[]> {
    return this.afs
      .collection("users", (ref) => ref.where("rol", "==", "usuario")).valueChanges();
  }

  getContactos(): Observable<any[]> {
    return this.afs
      .collection("users", (ref) => ref.where("rol", "==", "repartidor"))
      .valueChanges();
  }

  getUsuario(uid:string) {
    return this.afs
      .collection("users", (ref) => ref.where("uid", "==", uid))
      .valueChanges();
  }

  //Metodo para recuperar un contacto por el id

  async getContactoById(uid: string) {
    try {
      let aux = await this.afs
        .collection("usuarios", (ref) => ref.where("uid", "==", uid))
        .valueChanges()
        .pipe(first())
        .toPromise()
        .then((doc) => {
          return doc;
        })
        .catch((error) => {
          throw error;
        });
      if (aux == null) return {};
      return aux[0];
    } catch (error) {
      console.error("Error get  Byid", error);
      throw error;
    }
  }

  async getContactoCorreo(uid: string) {
    try {
      let aux = await this.afs
        .collection("usuarios", (ref) => ref.where("email", "==", uid))
        .valueChanges()
        .pipe(first())
        .toPromise()
        .then((doc) => {
          return doc;
        })
        .catch((error) => {
          throw error;
        });
      if (aux == null) return {};
      return aux[0];
    } catch (error) {
      console.error("Correo Dispoinible", error);
      throw error;
    }
  }
  
}
