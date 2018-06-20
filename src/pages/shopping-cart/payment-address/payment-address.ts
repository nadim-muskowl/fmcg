import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertProvider } from '../../../providers/alert/alert';
import { AddressProvider } from '../../../providers/address/address';
import { LoadingProvider } from '../../../providers/loading/loading';


import { ShippingAddressPage } from '../shipping-address/shipping-address';


@IonicPage()
@Component({
  selector: 'page-payment-address',
  templateUrl: 'payment-address.html',
})
export class PaymentAddressPage {
  private heading = 'Payment Address';

  // list
  public addresses;
  private countries;
  private zones;

  // fields
  private address_id = 0;
  private isNewAddress: boolean = false;

  // form fields
  private firstname;
  private lastname;
  private company;
  private address_1;
  private address_2;
  private postcode;
  private city;
  private country_id = 99;
  private zone_id = 1501;

  // errors
  private field_error = 'field is required';
  private error_firstname = 'field is required';
  private error_lastname = 'field is required';
  private error_company = 'field is required';
  private error_address_1 = 'field is required';
  private error_address_2 = 'field is required';
  private error_country_id = 'field is required';
  private error_zone_id = 'field is required';
  private error_postcode = 'field is required';
  private error_city = 'field is required';

  private success;
  private error_warning;
  // form data
  submitAttempt;
  addressForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private addressProvider: AddressProvider,
    public formBuilder: FormBuilder,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
  ) {
    this.getAddressData();
    this.createForm();
    this.getCountry();
    this.getZone(this.country_id);
  }

  ionViewDidLoad() {
  }

  public getAddressData() {
    this.loadingProvider.present();
    this.addressProvider.getAddress().subscribe(
      response => {
        // console.log(response);
        this.addresses = response.addresses;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  createForm() {
    this.addressForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      company: [''],
      address_1: ['', Validators.required],
      address_2: [''],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      country_id: ['', Validators.required],
      zone_id: ['', Validators.required],
    });
  }

  save() {
    this.submitAttempt = true;
    this.formData = this.addressForm.valid;
    if (this.addressForm.valid) {
      this.loadingProvider.present();
      this.addressProvider.addPaymentAddress(this.addressForm.value).subscribe(
        response => {
          this.responseData = response;
          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.addressForm.reset();
            this.submitAttempt = false;

            this.navCtrl.setRoot(ShippingAddressPage);
          }

          console.log(this.responseData.error);

          if (this.responseData.error) {

            if (this.responseData.error.firstname && this.responseData.error.firstname != '') {
              this.addressForm.controls['firstname'].setErrors({ 'incorrect': true });
              this.error_firstname = this.responseData.error.firstname;
            }

            if (this.responseData.error.lastname && this.responseData.error.lastname != '') {
              this.addressForm.controls['lastname'].setErrors({ 'incorrect': true });
              this.error_lastname = this.responseData.error.lastname;
            }

            if (this.responseData.error.company && this.responseData.error.company != '') {
              this.addressForm.controls['company'].setErrors({ 'incorrect': true });
              this.error_company = this.responseData.error.company;
            }

            if (this.responseData.error.address_1 && this.responseData.error.address_1 != '') {
              this.addressForm.controls['address_1'].setErrors({ 'incorrect': true });
              this.error_address_1 = this.responseData.error.address_1;
            }

            if (this.responseData.error.address_2 && this.responseData.error.address_2 != '') {
              this.addressForm.controls['address_2'].setErrors({ 'incorrect': true });
              this.error_address_2 = this.responseData.error.address_2;
            }

            if (this.responseData.error.country_id && this.responseData.error.country_id != '') {
              this.addressForm.controls['country_id'].setErrors({ 'incorrect': true });
              this.error_country_id = this.responseData.error.country_id;
            }

            if (this.responseData.error.zone_id && this.responseData.error.zone_id != '') {
              this.addressForm.controls['zone_id'].setErrors({ 'incorrect': true });
              this.error_zone_id = this.responseData.error.zone_id;
            }

            if (this.responseData.error.postcode && this.responseData.error.postcode != '') {
              this.addressForm.controls['postcode'].setErrors({ 'incorrect': true });
              this.error_postcode = this.responseData.error.postcode;
            }

            if (this.responseData.error.city && this.responseData.error.city != '') {
              this.addressForm.controls['city'].setErrors({ 'incorrect': true });
              this.error_city = this.responseData.error.city;
            }

            if (this.responseData.error_warning && this.responseData.error_warning != '') {
              this.error_warning = this.responseData.error_warning;
              this.alertProvider.title = 'Warning';
              this.alertProvider.message = this.error_warning;
              this.alertProvider.showAlert();
            }
          }



        },
        err => console.error(err),
        () => {
          this.loadingProvider.dismiss();
        }
      );
    }
  }

  fillFormData(address_id) {
    this.loadingProvider.present();
    this.addressProvider.getAddressData(address_id).subscribe(
      response => {
        this.firstname = response.firstname;
        this.lastname = response.lastname;
        this.company = response.company;
        this.address_1 = response.address_1;
        this.address_2 = response.address_2;
        this.postcode = response.postcode;
        this.city = response.city;
        this.country_id = response.country_id;
        this.zone_id = response.zone_id;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  clearFormData() {
    this.firstname = '';
    this.lastname = '';
    this.company = '';
    this.address_1 = '';
    this.address_2 = '';
    this.postcode = '';
    this.city = '';
    this.country_id = 99;
    this.zone_id = 1501;
  }

  public getCountry() {
    this.loadingProvider.present();
    this.addressProvider.getCountry().subscribe(
      response => {
        this.countries = response.countries;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  public getZone(country_id) {
    this.country_id = country_id;
    this.loadingProvider.present();
    this.addressProvider.getZone(this.country_id).subscribe(
      response => {
        this.zones = response.zone;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }


}
