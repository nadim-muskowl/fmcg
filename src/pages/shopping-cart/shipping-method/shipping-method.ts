import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { OrderProvider } from '../../../providers/order/order';

import { PaymentMethodPage } from '../payment-method/payment-method';

@IonicPage()
@Component({
  selector: 'page-shipping-method',
  templateUrl: 'shipping-method.html',
})
export class ShippingMethodPage {

  private heading = 'Shipping Method';
  // list
  public shipping_methods;

  // form data
  submitAttempt;
  shippingForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private shipping_method;

  // alerts
  private field_error = 'field is required';
  private success;
  private error_warning;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private orderProvider: OrderProvider,
    public formBuilder: FormBuilder,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider
  ) {
    this.getShippingMethods();
    this.createForm();
  }

  ionViewDidLoad() {

  }


  public getShippingMethods() {
    this.loadingProvider.present();
    this.orderProvider.getShippingMethods().subscribe(
      response => {
        console.log(response.shipping_methods);
        this.shipping_methods = response.shipping_methods;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  createForm() {
    this.shippingForm = this.formBuilder.group({
      shipping_method: ['', Validators.required],
    });
  }

  save() {
    this.submitAttempt = true;
    this.formData = this.shippingForm.valid;
    if (this.shippingForm.valid) {
      this.loadingProvider.present();

      this.orderProvider.addShippingMethod(this.shippingForm.value).subscribe(
        response => {
          console.log(response);
          this.responseData = response;
          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.shippingForm.reset();
            this.submitAttempt = false;
            this.navCtrl.setRoot(PaymentMethodPage);
          }

          if (this.responseData.error && this.responseData.error != '') {
            this.error_warning = this.responseData.error;
            this.alertProvider.title = 'Warning';
            this.alertProvider.message = this.error_warning;
            this.alertProvider.showAlert();
          }

        },
        err => {
          console.error(err);
          this.loadingProvider.dismiss();
        },
        () => {
          this.loadingProvider.dismiss();
        }
      );
    }
  }



}
