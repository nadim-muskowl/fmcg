import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductProvider } from '../../../providers/product/product';
import { CategoryProductsPage } from '../category-products/category-products';
import { LoadingProvider } from '../../../providers/loading/loading';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  public category_id;
  public child_id;
  public categories;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productProvider: ProductProvider,
    private loadingProvider: LoadingProvider,
    public viewCtrl: ViewController,
    
  ) {
    this.getServerData();
  }

  ionViewDidLoad() {
  }

  public getServerData() {
    this.loadingProvider.present();
    this.productProvider.categories().subscribe(
      response => {
        this.category_id = response.category_id;
        this.child_id = response.child_id;
        this.categories = response.categories;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  getDetail(data: any) {
    this.navCtrl.setRoot(CategoryProductsPage, { category_id: data.category_id });
  }


  public shownGroup = null;
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }
}
