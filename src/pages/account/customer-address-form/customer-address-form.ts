import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalProvider } from '../../../providers/modal/modal';
import { AlertProvider } from '../../../providers/alert/alert';
import { LoadingProvider } from '../../../providers/loading/loading';
import { AddressProvider } from '../../../providers/address/address';
@IonicPage()
@Component({
  selector: 'page-customer-address-form',
  templateUrl: 'customer-address-form.html',
})
export class CustomerAddressFormPage {

  public address_id;
  submitAttempt;
  addressForm: FormGroup;
  private formData: any;
  private status;
  private message;
  private responseData;
  private countries;
  private zones;
  // fields
  private firstname;
  private lastname;
  private company;
  private address_1;
  private address_2;
  private postcode;
  private city;
  private country_id = 99;
  private zone_id = 1501;
  private default = false;

  private field_error = 'field is required';
  private success;
  private error_warning;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalProvider: ModalProvider,
    public formBuilder: FormBuilder,
    public alertProvider: AlertProvider,
    public loadingProvider: LoadingProvider,
    private addressProvider: AddressProvider,
  ) {
    if (navParams.get('address_id')) {
      this.address_id = navParams.get('address_id');
    } else {
      this.address_id = null;
    }
    console.log(this.address_id);

    this.createForm();
    this.getCountry();
    this.getZone(this.country_id);

    if (this.address_id) {
      this.fillFormData(this.address_id);
    } else {
      this.clearFormData();
    }
  }

  ionViewDidLoad() {
  }

  dismiss() {
    this.modalProvider.dismiss();
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
      default: ['', Validators.required],
    });
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
        this.default = response.default;
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
    this.default = false;
  }

  save() {
    this.submitAttempt = true;
    this.formData = this.addressForm.valid;
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
      if (this.address_id) {
        this.edit(this.address_id);
      } else {
        this.add();
      }
    }
  }

  add() {
    this.loadingProvider.present();
    this.addressProvider.addAddress(this.addressForm.value).subscribe(
      response => {
        this.responseData = response;
        this.submitAttempt = true;

        if (this.responseData.success != '') {
          this.success = this.responseData.success;
          this.alertProvider.title = 'Success';
          this.alertProvider.message = this.success;
          this.alertProvider.showAlert();
          this.addressForm.reset();
          this.submitAttempt = false;
          this.dismiss();
        }

        if (this.responseData.error_warning != '') {
          this.error_warning = this.responseData.error_warning;
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

  edit(address_id) {
    this.loadingProvider.present();

    this.addressProvider.editAddress(this.addressForm.value, address_id).subscribe(
      response => {
        this.responseData = response;
        this.submitAttempt = true;

        if (this.responseData.success != '') {
          this.success = this.responseData.success;
          this.alertProvider.title = 'Success';
          this.alertProvider.message = this.success;
          this.alertProvider.showAlert();
          this.addressForm.reset();
          this.submitAttempt = false;
          this.dismiss();
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
