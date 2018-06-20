import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// pages
import { CustomerLoginPage } from '../customer-login/customer-login';
import { CustomerAddressPage } from '../customer-address/customer-address';
import { CustomerOrderPage } from '../customer-order/customer-order';
import { CustomerWishlistPage } from '../customer-wishlist/customer-wishlist';

// providers
import { CustomerProvider } from '../../../providers/customer/customer';
import { LoadingProvider } from '../../../providers/loading/loading';
import { ToastProvider } from '../../../providers/toast/toast';

@IonicPage()
@Component({
  selector: 'page-customer-account',
  templateUrl: 'customer-account.html',
})
export class CustomerAccountPage {
  public customer;
  public email;
  public telephone;
  public responseDbData;

  constructor(
    private customerProvider: CustomerProvider,
    public navCtrl: NavController,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    public navParams: NavParams) {
    this.isLogin();
  }

  ionViewDidLoad() {
    
  }

  isLogin() {
    this.customerProvider.getData()
      .then((data) => {
        if (!data) {
          this.navCtrl.setRoot(CustomerLoginPage);
        }
        this.customer = data.firstname + ' ' + data.lastname;
        this.email = data.email;
        this.telephone = data.telephone;
      })
      .catch(e => {
        console.log(e);
      });
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

  gotoAddress() {
    this.navCtrl.setRoot(CustomerAddressPage);
  }

  gotoWishlist() {
    this.navCtrl.setRoot(CustomerWishlistPage);
  }

  gotoOrders() {
    this.navCtrl.setRoot(CustomerOrderPage);
  }

}
