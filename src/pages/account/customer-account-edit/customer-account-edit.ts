import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactValidator } from '../../../validators/contact';
import { CustomerProvider } from '../../../providers/customer/customer';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { CustomerLoginPage } from '../customer-login/customer-login';

@IonicPage()
@Component({
  selector: 'page-customer-account-edit',
  templateUrl: 'customer-account-edit.html',
})
export class CustomerAccountEditPage {
  submitAttempt;
  accountForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private responseDbData;


  private success;
  private error;


  public firstname = '';
  public lastname = '';
  public email = '';
  public telephone = '';


  // errors
  private error_firstname = 'field is required';
  private error_lastname = 'field is required';
  private error_email = 'field is required';
  private error_telephone = 'field is required';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private customerProvider: CustomerProvider,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
  ) {

    this.firstname = this.customerProvider.firstname;
    this.lastname = this.customerProvider.lastname;
    this.email = this.customerProvider.email;
    this.telephone = this.customerProvider.telephone;

    this.createForm();
  }

  createForm() {
    this.accountForm = this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastname: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      telephone: ['', ContactValidator.isValid],
    });
  }

  save() {
    this.submitAttempt = true;
    if (this.accountForm.valid) {
      this.loadingProvider.present();

      this.formData = this.accountForm.valid;

      this.customerProvider.changeAccountData(this.accountForm.value).subscribe(
        response => {
          this.responseData = response;
          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.logout();
          }

          if (this.responseData.error_firstname != '') {
            this.accountForm.controls['firstname'].setErrors({ 'incorrect': true });
            this.error_firstname = this.responseData.error_firstname;
          }

          if (this.responseData.error_lastname != '') {
            this.accountForm.controls['lastname'].setErrors({ 'incorrect': true });
            this.error_lastname = this.responseData.error_lastname;
          }

          if (this.responseData.error_email != '') {
            this.accountForm.controls['email'].setErrors({ 'incorrect': true });
            this.error_email = this.responseData.error_email;
          }

          if (this.responseData.error_telephone != '') {
            this.accountForm.controls['telephone'].setErrors({ 'incorrect': true });
            this.error_telephone = this.responseData.error_telephone;
          }


          if (this.responseData.error_warning && this.responseData.error_warning != '') {
            this.error = this.responseData.error_warning;

            this.alertProvider.title = 'Warning';
            this.alertProvider.message = this.error;
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

  ionViewDidLoad() {

  }


  logout() {
    this.customerProvider.unSetData()
      .then((data) => {
        if (data) {
          this.navCtrl.setRoot(CustomerLoginPage);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

}
