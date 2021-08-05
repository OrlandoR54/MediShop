import { ProductService } from './../../services/product.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Category } from './../../modelo/category';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
})
export class CreateCategoryPage implements OnInit {

  category: Category = new Category();

  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    private router: Router,
    private prodService: ProductService,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
  ) { 
    route.queryParams.subscribe(params =>{
      console.log(params);
      this.category = new Category();
      //this.contacto = params.contacto;
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.category = this.router.getCurrentNavigation().extras.queryParams.categoria;
        console.log(this.category);
      }
    })
  }

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
  }

  async onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `Categorias/category_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

  }

  async addCategory(){
    /** Crea un mensaje */
   const toast = this.toastController.create({
     message: "Categoria añadido",
     duration: 2000,
   });
   const toastNo = this.toastController.create({
     message: "Ingrese todas las casillas",
     duration: 2000,
   });
   //console.log(this.option.nativeElement.value);
   /** valida quue est datos en los input */
   if (this.category.name || this.category.description != null) {
     
     this.prodService.saveCategory(this.category);
     (await toast).present();
     this.presentAlertConfirm();
   } else {
     (await toastNo).present();
   }
   
 }


 /** Alerta para confirmar si agregar mas productos **/
 async presentAlertConfirm() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Continuar añadiendo',
    message: '¿Quiere añadir otra <strong>categoria</strong>?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel: blah');
          this.router.navigate(["category"]);
        }
      }, {
        text: 'Si',
        handler: () => {
          console.log('Confirm Okay');
          this.router.navigate(["create-category"]);
        }
      }
    ]
  });

  await alert.present();
}

onDelete(){
  this.category.active = false;
}

back(){
  this.router.navigate(['category'])
}

}
