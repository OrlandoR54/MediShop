import { ProductService } from './../../services/product.service';
import { Product } from './../../modelo/product';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {

  selectedFile: any;
  isSelected: boolean = false;
  producto: Product = new Product();
  categorias: any;
  
  loading: HTMLIonLoadingElement;
  constructor(
    private loadingController: LoadingController,
    private storage: AngularFireStorage,
    private prodService: ProductService,
    public toastController: ToastController,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    route.queryParams.subscribe(params =>{
      console.log(params);
      this.producto = new Product();
      //this.contacto = params.contacto;
      if (this.router.getCurrentNavigation().extras.queryParams) {
        this.producto = this.router.getCurrentNavigation().extras.queryParams.producto;
        console.log(this.producto);
      }
    })
   }

  @ViewChild('imageProduct') inputImageProducto: ElementRef;
  @ViewChild('clearInput') clearInp: ElementRef;
  @ViewChild('soption') option: ElementRef;

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  ngOnInit() {
    this.categorias = this.prodService.getCategories();
  }

  /** Se carga una imagen en el Storage **/

  async onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `Productos/product_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

  }

  

  async addProduct(){
     /** Crea un mensaje */
    const toast = this.toastController.create({
      message: "Producto a??adido",
      duration: 2000,
    });
    const toastNo = this.toastController.create({
      message: "Ingrese todas las casillas",
      duration: 2000,
    });
    //console.log(this.option.nativeElement.value);
    /** valida quue est datos en los input */
    if (this.producto.displayName || this.producto.price || this.producto.stock != null) {
      
      this.prodService.saveProduct(this.producto);
      (await toast).present();
      this.producto.description ='';
      this.producto.price = 0;
      this.producto.stock = 0;
      this.presentAlertConfirm();
    } else {
      (await toastNo).present();
    }
    
  }


  /** Alerta para confirmar si agregar mas productos **/
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Continuar a??adiendo',
      message: '??Quiere a??adir otro <strong>producto</strong>?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.router.navigate(["product"]);
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  back(){
    this.router.navigate(['product'])
  }
}
