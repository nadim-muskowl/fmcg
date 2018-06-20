import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { ConfigProvider } from '../config/config';


@Injectable()
export class ProductProvider {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public search;
  private URL;

  constructor(public http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  public categories(): any {
    this.URL = ConfigProvider.BASE_URL + 'category';
    this.URL += '&api_token=' + ConfigProvider.API_TOKEN;

    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  public products(data): any {
    var id = data.category_id;
    var limit = data.limit;
    var sort = data.sort;
    var order = data.order;
    this.URL = ConfigProvider.BASE_URL;
    this.URL += 'category/product&path=' + id;

    if (limit) {
      this.URL += '&limit=' + limit;
    }

    if (sort) {
      this.URL += '&sort=' + sort;
    }
    if (order) {
      this.URL += '&order=' + order;
    }

    this.URL += '&api_token=' + ConfigProvider.API_TOKEN;

    return this.http.get(this.URL);
  }

  public product(id: Number): any {
    this.URL = ConfigProvider.BASE_URL + 'product&product_id=' + id;
    this.URL += '&api_token=' + ConfigProvider.API_TOKEN;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }


}
