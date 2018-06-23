import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../../providers/product/product';
import { ProductPage } from '../product/product';
import { ActionSheetController } from 'ionic-angular';
import { LoadingProvider } from '../../../providers/loading/loading';


@IonicPage()
@Component({
  selector: 'page-search-products',
  templateUrl: 'search-products.html',
})
export class SearchProductsPage {

  public rateValue;
  public filterData;
  public search;

  public heading_title;
  public description;
  public categories;
  public products;
  public sorts;
  public limits;
  public pagination;
  public results;
  public sort;
  public order;
  public limit;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productsProvider: ProductProvider,
    public actionSheetCtrl: ActionSheetController,
    private loadingProvider: LoadingProvider
  ) {
    this.search = this.navParams.data.search;     
    this.getServerData();
  }

  ionViewDidLoad() {

  }


  presentSortActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sort Products',
    });

    for (let index = 0; index < this.sorts.length; index++) {
      var sortsButtons = {
        text: this.sorts[index].text,
        handler: () => {
          this.sort = this.sorts[index].value;
          let sortArray = this.sort.split("-");
          this.sort = sortArray[0];
          this.order = sortArray[1];

          this.getServerData();
        }
      };
      actionSheet.addButton(sortsButtons);
    }
    actionSheet.present();
  }

  presentLimitActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Limit of Products',
    });

    for (let index = 0; index < this.limits.length; index++) {
      var limitButtons = {
        text: this.limits[index].text,
        handler: () => {
          this.limit = this.limits[index].value;
          this.getServerData();
        }
      };
      actionSheet.addButton(limitButtons);
    }
    actionSheet.present();
  }

  public getServerData() {
    this.filterData = {
      'search': this.search,
      'limit': this.limit,
      'sort': this.sort,
      'order': this.order
    };
    this.loadingProvider.present();
    this.productsProvider.searchProducts(this.filterData).subscribe(
      response => {
        this.heading_title = response.heading_title;
        this.description = response.description;
        this.categories = response.categories;
        this.products = response.products;
        this.sorts = response.sorts;
        this.limits = response.limits;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  getProductDetail(data: any) {
    this.navCtrl.setRoot(ProductPage, { product_id: data.product_id });
  }

  onRateChange(rate) {
    this.rateValue = 0;
    this.rateValue = parseFloat(rate);
  }

}
