import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';

@Injectable()
export class OrderProvider {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(public http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getShippingMethods(): any {
    this.URL = ConfigProvider.BASE_URL + 'shipping/api_methods&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  addShippingMethod(data: any): any {
    this.URL = ConfigProvider.BASE_URL + 'shipping/method&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    this.formData.append('shipping_method', data.shipping_method);
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getPaymentMethods(): any {
    this.URL = ConfigProvider.BASE_URL + 'payment/api_methods&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  addPaymentMethod(data: any): any {
    this.URL = ConfigProvider.BASE_URL + 'payment/method&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    this.formData.append('payment_method', data.payment_method);
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  addCustomer(data: any): any {
    console.log(data);

    this.URL = ConfigProvider.BASE_URL + 'customer&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;

    this.formData.append('customer_id', data.customer_id);
    this.formData.append('customer_group_id', data.customer_group_id);
    this.formData.append('firstname', data.firstname);
    this.formData.append('lastname', data.lastname);
    this.formData.append('email', data.email);
    this.formData.append('telephone', data.telephone);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  addOrder(): any {
    this.URL = ConfigProvider.BASE_URL + 'order/add&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getOrders() {
    this.URL = ConfigProvider.BASE_URL + 'order&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    console.log(this.URL);
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  getOrderDetail(order_id: any) {
    this.URL = ConfigProvider.BASE_URL + 'order/info&order_id=' + order_id + '&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    console.log(this.URL);
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

}
