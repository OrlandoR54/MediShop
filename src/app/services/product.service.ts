import { Category } from './../modelo/category';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './../modelo/product';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    public afs: AngularFirestore
  ) { }

  /** GUARDA Y ACTUALIZA LA TABLA PRODUCTS **/
  saveProduct(product: Product){
    const refProduct = this.afs.collection("products");

    if (product.uid == null) {
      product.uid = this.afs.createId()
      product.deleted = false
    };

    refProduct
      .doc(product.uid)
      .set(Object.assign({}, product), { merge: true });
  }

   /** GUARDA Y ACTUALIZA LA TABLA CATEGORY **/
  saveCategory(category: Category){
    const refCategory = this.afs.collection("category");

    if (category.uid == null) {
      category.uid = this.afs.createId()
      category.active = true;
    };

    refCategory
      .doc(category.uid)
      .set(Object.assign({}, category), { merge: true });
  }

  getProductos(): Observable<any[]> {
    return this.afs.collection("products").valueChanges();
  }

  getProductActive(): Observable<any[]> {
    return this.afs.collection("products", 
    ref => ref.where("deleted" , "==", false)).valueChanges();
  }

  getProdCat(categoryUID:string): Observable<any[]> {
    return this.afs.collection("products", 
    ref => ref.where("categoryUID" , "==", categoryUID)
              .where("deleted" , "==", false)).valueChanges();
  }

  getCategoriesUID(uid:string): Observable<any[]> {
    return this.afs.collection("category", 
    ref => ref.where("uid" , "==", uid)).valueChanges();
  }

  /** Ontiene todas las categorias **/
  getCategories(): Observable<any[]> {
    return this.afs.collection("category").valueChanges();
  }

  /** Ontiene las categorias activas**/
  getCategoriesActive(): Observable<any[]> {
    return this.afs.collection("category", 
    ref => ref.where("active" , "==", true)).valueChanges();
  }

}
