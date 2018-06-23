import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MyApp } from './app.component';
import { Ionic2RatingModule } from 'ionic2-rating';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { Device } from '@ionic-native/device';

import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
// pages
import { HomePage } from '../pages/home/home';
import { StoresPage } from '../pages/stores/stores';
import { TabsPage } from '../pages/tabs/tabs';
//public
import { TermsAndConditionsPage } from '../pages/public/terms-and-conditions/terms-and-conditions';
import { HelpAndSupportPage } from '../pages/public/help-and-support/help-and-support';
import { NotificationsPage } from '../pages/public/notifications/notifications';
import { ContactUsPage } from '../pages/public/contact-us/contact-us';

//products
import { CategoriesPage } from '../pages/products/categories/categories';
import { CategoryProductsPage } from '../pages/products/category-products/category-products';
import { ProductPage } from '../pages/products/product/product';
import { SpecialProductsPage } from '../pages/products/special-products/special-products';
import { SearchProductsPage } from '../pages/products/search-products/search-products';

// account
import { CustomerLoginPage } from '../pages/account/customer-login/customer-login';
import { CustomerRegisterPage } from '../pages/account/customer-register/customer-register';
import { CustomerAccountPage } from '../pages/account/customer-account/customer-account';
import { CustomerAddressPage } from '../pages/account/customer-address/customer-address';
import { CustomerAddressFormPage } from '../pages/account/customer-address-form/customer-address-form';
import { CustomerOrderPage } from '../pages/account/customer-order/customer-order';
import { CustomerOrderViewPage } from '../pages/account/customer-order-view/customer-order-view';
import { CustomerWishlistPage } from '../pages/account/customer-wishlist/customer-wishlist';
import { CustomerAccountEditPage } from '../pages/account/customer-account-edit/customer-account-edit';
import { CustomerChangePasswordPage } from '../pages/account/customer-change-password/customer-change-password';

// shopping-cart
import { CartPage } from '../pages/shopping-cart/cart/cart';
import { PaymentAddressPage } from '../pages/shopping-cart/payment-address/payment-address';
import { PaymentMethodPage } from '../pages/shopping-cart/payment-method/payment-method';
import { ShippingAddressPage } from '../pages/shopping-cart/shipping-address/shipping-address';
import { ShippingMethodPage } from '../pages/shopping-cart/shipping-method/shipping-method';
import { OrderConfirmPage } from '../pages/shopping-cart/order-confirm/order-confirm';
import { CartEditFormPage } from '../pages/shopping-cart/cart-edit-form/cart-edit-form';
import { CartCustomerFormPage } from '../pages/shopping-cart/cart-customer-form/cart-customer-form';
import { CartSuccessPage } from '../pages/shopping-cart/cart-success/cart-success';

// components
import { CustomerAddressComponent } from '../components/customer-address/customer-address';
import { CartComponent } from '../components/cart/cart';
import { ProductReviewComponent } from '../components/product-review/product-review';


// providers
import { FollowUsProvider } from '../providers/follow-us/follow-us';
import { ConfigProvider } from '../providers/config/config';

import { ProductProvider } from '../providers/product/product';
import { CustomerProvider } from '../providers/customer/customer';
import { AlertProvider } from '../providers/alert/alert';
import { LoadingProvider } from '../providers/loading/loading';
import { AddressProvider } from '../providers/address/address';
import { ToastProvider } from '../providers/toast/toast';
import { ModalProvider } from '../providers/modal/modal';
import { CartProvider } from '../providers/cart/cart';
import { OrderProvider } from '../providers/order/order';
import { WishlistProvider } from '../providers/wishlist/wishlist';
import { HomeProvider } from '../providers/home/home';
import { InformationProvider } from '../providers/information/information';

import { HideHeaderDirective } from '../directives/hide-header/hide-header';


@NgModule({
  
  declarations: [
    MyApp,
    HomePage,
    StoresPage,
    TabsPage,
    CategoriesPage,
    CategoryProductsPage,
    ProductPage,
    CustomerOrderPage,
    CustomerWishlistPage,
    CustomerLoginPage,
    CustomerRegisterPage,
    CustomerAccountPage,
    CustomerAddressPage,
    CustomerAddressComponent,
    CustomerAddressFormPage,
    CartComponent,
    CartPage,
    PaymentAddressPage,
    PaymentMethodPage,
    ShippingAddressPage,
    ShippingMethodPage,
    OrderConfirmPage,
    CartEditFormPage,
    CartCustomerFormPage,
    CartSuccessPage,
    CustomerOrderViewPage,
    HideHeaderDirective,
    SpecialProductsPage,
    ProductReviewComponent,
    TermsAndConditionsPage,
    HelpAndSupportPage,
    NotificationsPage,
    ContactUsPage,
    SearchProductsPage,
    CustomerAccountEditPage,
    CustomerChangePasswordPage    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp,],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    StoresPage,
    CategoriesPage,
    CategoryProductsPage,
    ProductPage,
    CustomerLoginPage,
    CustomerOrderPage,
    CustomerWishlistPage,
    CustomerRegisterPage,
    CustomerAccountPage,
    CustomerAddressPage,
    CustomerAddressFormPage,
    CartComponent,
    CartPage,
    PaymentAddressPage,
    PaymentMethodPage,
    ShippingAddressPage,
    ShippingMethodPage,
    OrderConfirmPage,
    CartEditFormPage,
    CartCustomerFormPage,
    CartSuccessPage,
    CustomerOrderViewPage,
    SpecialProductsPage,
    ProductReviewComponent,
    TermsAndConditionsPage,
    HelpAndSupportPage,
    NotificationsPage,
    ContactUsPage,
    SearchProductsPage,
    CustomerAccountEditPage,
    CustomerChangePasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    AppAvailability,
    Device,
    NativeStorage,
    SQLitePorter,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    FollowUsProvider,
    ProductProvider,
    CustomerProvider,
    AlertProvider,
    LoadingProvider,
    AddressProvider,
    ToastProvider,
    ModalProvider,
    CartProvider,
    OrderProvider,
    WishlistProvider,  
    HomeProvider,
    InformationProvider,  
  ]
})
export class AppModule { }
