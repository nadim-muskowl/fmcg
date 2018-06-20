import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// pages
import { CustomerRegisterPage } from '../customer-register/customer-register';
import { CustomerAccountPage } from '../customer-account/customer-account';
// providers
import { CustomerProvider } from '../../../providers/customer/customer';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { CustomerModel } from '../../../models/customer-model';

@IonicPage()
@Component({
  selector: 'page-customer-login',
  templateUrl: 'customer-login.html',
})
export class CustomerLoginPage {

  public customerModel = new CustomerModel();

  submitAttempt;
  loginForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private responseDbData;

  private error_email = 'field is required';
  private error_password = 'field is required';
  private success;
  private error_warning;

  public customer;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private customerProvider: CustomerProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,

  ) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.required]
    });

    this.customerProvider.getData().then((data) => {
      if (data) {
        this.navCtrl.setRoot(CustomerAccountPage);
      }
    }).catch(e => {
      console.log(e);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerLoginPage');
  }

  goToRegsiter() {
    this.navCtrl.setRoot(CustomerRegisterPage);
  }

  save() {
    this.submitAttempt = true;
    this.formData = this.loginForm.valid;

    if (this.loginForm.valid) {
      this.loadingProvider.present();
      this.customerProvider.apiLogin(this.loginForm.value).subscribe(
        response => {
          this.responseData = response;

          this.submitAttempt = true;

          if (this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.loginForm.reset();
            this.submitAttempt = false;
            this.customerProvider.setData(this.responseData.data);
            this.navCtrl.setRoot(CustomerAccountPage);
          }

          if (this.responseData.error_warning != '') {
            this.error_warning = this.responseData.error_warning;

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


}
