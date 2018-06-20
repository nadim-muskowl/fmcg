import { Component } from '@angular/core';
import { ModalController, NavParams } from 'ionic-angular';
// providers
import { CustomerProvider } from '../../providers/customer/customer';
import { AddressProvider } from '../../providers/address/address';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
import { ModalProvider } from '../../providers/modal/modal';
// pages
import { CustomerAddressFormPage } from '../../pages/account/customer-address-form/customer-address-form';

@Component({
  selector: 'customer-address',
  templateUrl: 'customer-address.html'
})
export class CustomerAddressComponent {

  text: string;
  public addresses;

  constructor(
    private addressProvider: AddressProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    public modalProvider: ModalProvider
  ) {
    this.text = 'Address Book Entries';
    this.getAddressData();
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

  public deleteAddress(address) {
    this.loadingProvider.present();
    this.addressProvider.deleteAddress(address.address_id).subscribe(
      response => {
        if (response.success) {
          this.toastProvider.message = response.success;
        }
        if (response.error_warning) {
          this.toastProvider.message = response.error_warning;
        }
        this.toastProvider.presentToast();

        this.getAddressData();
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  public editAddress(address) {
    let param = { address_id: address.address_id };
    this.modalProvider.presentProfileModal(CustomerAddressFormPage, param);

    this.modalProvider.modal.onDidDismiss(data => {
      this.getAddressData();
    });
  }

  public addAddress() {
    let param = {};
    this.modalProvider.presentProfileModal(CustomerAddressFormPage, param);
    this.modalProvider.modal.onDidDismiss(data => {
      this.getAddressData();
    });
  }

}
