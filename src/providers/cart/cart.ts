import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';

@Injectable()
export class CartProvider {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;
  constructor(public http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  products(): any {
    this.URL = ConfigProvider.BASE_URL + 'cart/products&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    console.log(this.URL);
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  add(data: any): any {
    this.URL = ConfigProvider.BASE_URL + 'cart/add&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    this.formData.append('product_id', data.product_id);
    this.formData.append('quantity', data.quantity);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  edit(data: any): any {
    this.URL = ConfigProvider.BASE_URL + 'cart/edit&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    this.formData.append('key', data.cart_id);
    this.formData.append('quantity', data.quantity);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  remove(data: any): any {
    this.URL = ConfigProvider.BASE_URL + 'cart/remove&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    this.formData.append('key', data.cart_id);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  addPaymentAddress(data: any): any {
    this.URL = ConfigProvider.BASE_URL + 'payment/address&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    this.formData.append('firstname', data.firstname);
    this.formData.append('lastname', data.lastname);
    this.formData.append('company', data.company);
    this.formData.append('address_1', data.address_1);
    this.formData.append('address_2', data.address_2);
    this.formData.append('postcode', data.postcode);
    this.formData.append('city', data.city);
    this.formData.append('country_id', data.country_id);
    this.formData.append('zone_id', data.zone_id);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  addShippingAddress(data: any): any {
    this.URL = ConfigProvider.BASE_URL + 'shipping/address&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    this.formData.append('firstname', data.firstname);
    this.formData.append('lastname', data.lastname);
    this.formData.append('company', data.company);
    this.formData.append('address_1', data.address_1);
    this.formData.append('address_2', data.address_2);
    this.formData.append('postcode', data.postcode);
    this.formData.append('city', data.city);
    this.formData.append('country_id', data.country_id);
    this.formData.append('zone_id', data.zone_id);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

}
