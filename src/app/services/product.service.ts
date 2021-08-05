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

  getProductos(): Observable<any[]> {
    return this.afs.collection("products").valueChanges();
  }

  getCategories(): Observable<any[]> {
    return this.afs.collection("category", 
    ref => ref.where("active" , "==", true)).valueChanges();
  }

}
