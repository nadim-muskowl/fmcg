import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerProvider } from '../../../providers/customer/customer';
import { OrderProvider } from '../../../providers/order/order';
import { AlertProvider } from '../../../providers/alert/alert';
import { ContactValidator } from '../../../validators/contact';
import { LoadingProvider } from '../../../providers/loading/loading';
import { PaymentAddressPage } from '../payment-address/payment-address';
@IonicPage()
@Component({
  selector: 'page-cart-customer-form',
  templateUrl: 'cart-customer-form.html',
})
export class CartCustomerFormPage {
  text = 'Fill form for proceed order';
  submitAttempt;
  cartCustomerForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;

  // errors
  private error_firstname = 'field is required';
  private error_lastname = 'field is required';
  private error_email = 'field is required';
  private error_telephone = 'field is required';
  private error_warning;

  // variables 
  private customer_id;
  private customer_group_id;
  private firstname;
  private lastname;
  private email;
  private telephone;
  private text_message;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private customerProvider: CustomerProvider,
    private orderProvider: OrderProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
  ) {
    this.createForm();
    this.fillForm();
  }

  ionViewDidLoad() {
  }

  fillForm() {
    this.customer_id = this.customerProvider.customer_id;
    this.customer_group_id = this.customerProvider.customer_group_id;
    this.firstname = this.customerProvider.firstname;
    this.lastname = this.customerProvider.lastname;
    this.email = this.customerProvider.email;
    this.telephone = this.customerProvider.telephone;
  }

  createForm() {
    this.cartCustomerForm = this.formBuilder.group({
      customer_id: [''],
      customer_group_id: [''],
      firstname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      telephone: ['', ContactValidator.isValid]
    });
  }

  save() {
    this.submitAttempt = true;
    if (this.cartCustomerForm.valid) {

      this.formData = this.cartCustomerForm.value;

      this.loadingProvider.present();

      this.orderProvider.addCustomer(this.formData).subscribe(
        response => {
          this.responseData = response;
          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.text_message = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.text_message;
            this.alertProvider.showAlert();
            this.navCtrl.setRoot(PaymentAddressPage);
          }

          if (this.responseData.error) {


            if (this.responseData.error.firstname && this.responseData.error.firstname != '') {
              this.cartCustomerForm.controls['firstname'].setErrors({ 'incorrect': true });
              this.error_firstname = this.responseData.error.firstname;
            }

            if (this.responseData.error.lastname && this.responseData.error.lastname != '') {
              this.cartCustomerForm.controls['lastname'].setErrors({ 'incorrect': true });
              this.error_lastname = this.responseData.error.lastname;
            }

            if (this.responseData.error.email && this.responseData.error.email != '') {
              this.cartCustomerForm.controls['email'].setErrors({ 'incorrect': true });
              this.error_email = this.responseData.error.email;
            }

            if (this.responseData.error.telephone && this.responseData.error.telephone != '') {
              this.cartCustomerForm.controls['telephone'].setErrors({ 'incorrect': true });
              this.error_telephone = this.responseData.error.telephone;
            }

            if (this.responseData.error.warning && this.responseData.error.warning != '') {
              this.error_warning = this.responseData.error.warning;
              this.alertProvider.title = 'Warning';
              this.alertProvider.message = this.error_warning;
              this.alertProvider.showAlert();
            }
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
