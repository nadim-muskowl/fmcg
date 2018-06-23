import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, IonicApp, MenuController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CustomerWishlistPage } from '../pages/account/customer-wishlist/customer-wishlist';
import { CustomerOrderPage } from '../pages/account/customer-order/customer-order';

import { CartPage } from '../pages/shopping-cart/cart/cart';
import { CategoriesPage } from '../pages/products/categories/categories';
import { CustomerAccountPage } from '../pages/account/customer-account/customer-account';

import { ConfigProvider } from '../providers/config/config';
import { CustomerProvider } from '../providers/customer/customer';
import { FollowUsProvider } from '../providers/follow-us/follow-us';


//public
import { TermsAndConditionsPage } from '../pages/public/terms-and-conditions/terms-and-conditions';
import { HelpAndSupportPage } from '../pages/public/help-and-support/help-and-support';
import { NotificationsPage } from '../pages/public/notifications/notifications';
import { ContactUsPage } from '../pages/public/contact-us/contact-us';


import { SearchProductsPage } from '../pages/products/search-products/search-products';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public searchInput;
  rootPage: any = TabsPage;
  alert;

  pages: PageInterface[] = [
    { title: 'home', name: 'TabsPage', component: TabsPage, tabComponent: HomePage, index: 0, icon: 'assets/icon/home.png' },
    { title: 'shop by categories', name: 'TabsPage', component: TabsPage, tabComponent: CategoriesPage, index: 1, icon: 'assets/icon/home.png' },
    { title: 'profile', name: 'CustomerAccountPage', component: CustomerAccountPage, icon: 'assets/icon/home.png' },
    { title: 'favourites', name: 'CustomerWishlistPage', component: CustomerWishlistPage, icon: 'assets/icon/home.png' },
    { title: 'track order', name: 'CustomerOrderPage', component: CustomerOrderPage, icon: 'assets/icon/home.png' },
    { title: 'notification', name: 'NotificationsPage', component: NotificationsPage, icon: 'assets/icon/home.png' },
    { title: 'terms & conditions', name: 'TermsAndConditionsPage', component: TermsAndConditionsPage, icon: 'assets/icon/home.png' },
    { title: 'help & support', name: 'HelpAndSupportPage', component: HelpAndSupportPage, icon: 'assets/icon/home.png' },
    { title: 'contact us', name: 'ContactUsPage', component: ContactUsPage, icon: 'assets/icon/home.png' },
  ];

  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public configProvider: ConfigProvider,
    private customerProvider: CustomerProvider,
    private followUsProvider: FollowUsProvider,
    public app: App,
    public menu: MenuController,
  ) {
    this.initializeApp();
    this.checkToken();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.registerBackButtonAction(() => {
        let nav = this.app.getRootNav();
        // alert(JSON.stringify(nav));

        // if (nav.canGoBack()) {
        //   nav.pop();
        // } else {
        //   this.platform.exitApp();
        // }

        this.openPage(this.pages[0]);
      });

    });
  }


  presentActionSheet() {
    this.followUsProvider.presentActionSheet();
  }

  goToAccount() {
    this.nav.setRoot(CustomerAccountPage);
  }

  goToHome() {
    this.nav.setRoot(HomePage);
  }

  goTocart() {
    this.nav.setRoot(CartPage);
  }

  goToWishlist() {
    this.nav.setRoot(CustomerWishlistPage);
  }

  checkToken() {
    this.configProvider.apiLogin();
  }

  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If tabs page is already active just change the tab index
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.component, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0];

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }


  public onSearch(ev: any) {
    this.searchInput = ev.target.value;
    this.nav.setRoot(SearchProductsPage, { search: ev.target.value });
  }

  public onSearchCancel() {
    this.searchInput = '';
  }

}
