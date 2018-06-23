import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddressProvider } from '../../providers/address/address';
import { LoadingProvider } from '../../providers/loading/loading';
import { ToastProvider } from '../../providers/toast/toast';
@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html',
})
export class StoresPage {
  public image;
  public store;
  public address;
  public geocode;
  public telephone;
  public fax;
  public open;
  public comment;
  public locations;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private addressProvider: AddressProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider, ) {
  }

  ionViewDidLoad() {
    this.getData();
  }

  public getData() {
    this.loadingProvider.present();
    this.addressProvider.getStores().subscribe(
      response => {
        // console.log(response);
        this.image = response.image;
        this.store = response.store;
        this.address = response.address;
        this.geocode = response.geocode;
        this.telephone = response.telephone;
        this.fax = response.fax;
        this.open = response.open;
        this.comment = response.comment;
        this.locations = response.locations;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }
}
