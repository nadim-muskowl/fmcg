import { Component, ViewChild } from '@angular/core';
import { App } from 'ionic-angular/components/app/app';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CustomerWishlistPage } from '../pages/account/customer-wishlist/customer-wishlist';
import { CartPage } from '../pages/shopping-cart/cart/cart';
import { CategoriesPage } from '../pages/products/categories/categories';
import { CustomerAccountPage } from '../pages/account/customer-account/customer-account';

import { ConfigProvider } from '../providers/config/config';
import { CustomerProvider } from '../providers/customer/customer';
import { FollowUsProvider } from '../providers/follow-us/follow-us';


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

  rootPage: any = TabsPage;

  pages: PageInterface[] = [
    { title: 'home', name: 'TabsPage', component: TabsPage, tabComponent: HomePage, index: 0, icon: 'assets/icon/home.png' },
    { title: 'shop by categories', name: 'TabsPage', component: TabsPage, tabComponent: CategoriesPage, index: 1, icon: 'assets/icon/home.png' },
    { title: 'profile', name: 'TabsPage', component: TabsPage, tabComponent: CustomerAccountPage, index: 2, icon: 'assets/icon/home.png' },
    { title: 'favourites', name: 'CustomerWishlistPage', component: CustomerWishlistPage, icon: 'assets/icon/home.png' },
  ];

  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public configProvider: ConfigProvider,
    private customerProvider: CustomerProvider,
    private followUsProvider: FollowUsProvider,
    app: App
  ) {
    this.platform.ready().then(() => {
      this.platform.registerBackButtonAction(() => {
        app.navPop();
      });
    });
    this.checkToken();
    this.initializeApp();

    // // used for an example of ngFor and navigation
    // this.pages = [        
    //   { title: 'track order', icon: 'assets/icon/track_order.png', component: HomePage },    
    //   { title: 'notification', icon: 'assets/icon/home.png', component: HomePage },
    //   { title: 'terms & conditions', icon: 'assets/icon/home.png', component: HomePage },
    //   { title: 'help & support', icon: 'assets/icon/home.png', component: HomePage },
    //   { title: 'contact', icon: 'assets/icon/home.png', component: HomePage },
    // ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
}
