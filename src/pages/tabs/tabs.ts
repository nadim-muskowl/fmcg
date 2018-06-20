import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CustomerAccountPage } from '../account/customer-account/customer-account';
import { CategoriesPage } from '../products/categories/categories';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoriesPage;
  tab3Root = CustomerAccountPage;
  myIndex: number;
  constructor(navParams: NavParams) {
    console.log(navParams.data);
    if (navParams.data) {
      this.myIndex = navParams.data.tabIndex || 0;
    } else {
      this.myIndex = 0;
    }

  }
}
