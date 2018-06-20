import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { OrderProvider } from '../../../providers/order/order';
import { OrderConfirmPage } from '../order-confirm/order-confirm';

@IonicPage()
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html',
})
export class PaymentMethodPage {
  private heading = 'Payment Method';
  // list
  public payment_methods;

  // form data
  submitAttempt;
  paymentForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private payment_method;

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
    this.getPaymentMethods();
    this.createForm();
  }

  ionViewDidLoad() {
  }


  public getPaymentMethods() {
    this.loadingProvider.present();
    this.orderProvider.getPaymentMethods().subscribe(
      response => {
        console.log(response.payment_methods);
        this.payment_methods = response.payment_methods;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  createForm() {
    this.paymentForm = this.formBuilder.group({
      payment_method: ['', Validators.required],
    });
  }

  save() {
    this.submitAttempt = true;
    this.formData = this.paymentForm.valid;
    if (this.paymentForm.valid) {
      this.loadingProvider.present();

      this.orderProvider.addPaymentMethod(this.paymentForm.value).subscribe(
        response => {
          console.log(response);
          this.responseData = response;
          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.paymentForm.reset();
            this.submitAttempt = false;
            this.navCtrl.setRoot(OrderConfirmPage);
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
