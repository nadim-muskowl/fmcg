import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductProvider } from '../../../providers/product/product';
import { CartProvider } from '../../../providers/cart/cart';
import { WishlistProvider } from '../../../providers/wishlist/wishlist';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AlertProvider } from '../../../providers/alert/alert';

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  public product_id: number;
  public heading_title;
  public manufacturer;
  public description;
  public stock;
  public price;
  public special;
  public rating;
  public popup;

  public images;

  submitAttempt;
  cartForm: FormGroup;
  private formData: any;
  private cart_quantity = 1;
  private status;
  private message;
  private responseData;
  private success;
  private error_warning;
  private field_error = 'field is required';


  private review_tab: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private cartProvider: CartProvider,
    private wishlistProvider: WishlistProvider,
    public formBuilder: FormBuilder,
    public alertProvider: AlertProvider,
    private loadingProvider: LoadingProvider
  ) {
    this.product_id = this.navParams.data.product_id;
    this.getServerData();
    this.createForm();
  }

  public getServerData() {
    this.loadingProvider.present();
    this.productProvider.product(this.product_id).subscribe(
      response => {
        this.heading_title = response.heading_title;
        this.description = response.description;
        this.manufacturer = response.manufacturer;
        this.stock = response.stock;
        this.price = response.price;
        this.special=response.special;
        this.rating = response.rating;
        this.popup = response.popup;
        this.images = response.images;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  ionViewWillEnter() {
    this.review_tab = 'description';
  }

  ionViewDidLoad() {
  }

  backButtonClick() {
    this.navCtrl.pop();
  }

  createForm() {
    this.cartForm = this.formBuilder.group({
      quantity: ['', Validators.required]
    });
  }

  save() {
    this.submitAttempt = true;

    if (this.cartForm.valid) {
      this.formData = {
        quantity: this.cartForm.value.quantity,
        product_id: Number(this.product_id)
      };
      this.loadingProvider.present();
      this.cartProvider.add(this.formData).subscribe(
        response => {
          console.log(response);
          this.responseData = response;

          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.cartForm.reset();
            this.submitAttempt = false;
          }

          if (this.responseData.error && this.responseData.error != '') {
            if (this.responseData.error.store && this.responseData.error.store != '') {
              this.error_warning = this.responseData.error.store;
            }
            if (this.responseData.error.warning && this.responseData.error.warning != '') {
              this.error_warning = this.responseData.error.warning;
            }

            this.alertProvider.title = 'Warning';
            this.alertProvider.message = this.error_warning;
            this.alertProvider.showAlert();
          }

        },
        err => console.error(err),
        () => {
          this.loadingProvider.dismiss();
        }
      );
    }

  }

  addWishlist() {
    this.formData = {
      product_id: Number(this.product_id)
    };
    this.loadingProvider.present();
    this.wishlistProvider.addWishlist(this.formData).subscribe(
      response => {
        console.log(response);
        this.responseData = response;

        if (this.responseData.success && this.responseData.success != '') {
          this.success = this.responseData.success;
          this.alertProvider.title = 'Success';
          this.alertProvider.message = this.success;
          this.alertProvider.showAlert();
          this.getServerData();
        }

        if (this.responseData.error && this.responseData.error != '') {
          this.error_warning = this.responseData.error;

          this.alertProvider.title = 'Warning';
          this.alertProvider.message = this.error_warning;
          this.alertProvider.showAlert();
        }

      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
  }


}
