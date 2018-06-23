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

  public specialProducts(data): any {
    var limit = data.limit;
    var sort = data.sort;
    var order = data.order;
    this.URL = ConfigProvider.BASE_URL;
    this.URL += 'special';

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

  public getReviews(product_id): any {
    this.URL = ConfigProvider.BASE_URL + 'product/review';
    this.URL += '&product_id=' + product_id;

    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  public postReviews(product_id, data): any {
    this.formData.append('name', data.name);
    this.formData.append('text', data.text);
    this.formData.append('rating', data.rating);

    this.URL = ConfigProvider.BASE_URL + 'product/write';
    this.URL += '&product_id=' + product_id;

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }


  public searchProducts(data): any {
    var search = data.search;
    var limit = data.limit;
    var sort = data.sort;
    var order = data.order;
    this.URL = ConfigProvider.BASE_URL;
    this.URL += 'search';

    if (search) {
      this.URL += '&search=' + search;
    }

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

}
