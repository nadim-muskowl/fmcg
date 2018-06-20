import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';

@Injectable()
export class AddressProvider {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(public http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getAddress(): any {
    this.URL = ConfigProvider.BASE_URL + 'address&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  getAddressData(address_id): any {
    this.URL = ConfigProvider.BASE_URL + 'address/edit&customer_id=' + ConfigProvider.CUSTOMER_ID + '&address_id=' + address_id + '&api_token=' + ConfigProvider.API_TOKEN;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  addAddress(data: any): any {
    this.URL = ConfigProvider.BASE_URL + 'address/add&customer_id=' + ConfigProvider.CUSTOMER_ID + '&api_token=' + ConfigProvider.API_TOKEN;
    this.formData.append('firstname', data.firstname);
    this.formData.append('lastname', data.lastname);
    this.formData.append('company', data.company);
    this.formData.append('address_1', data.address_1);
    this.formData.append('address_2', data.address_2);
    this.formData.append('postcode', data.postcode);
    this.formData.append('city', data.city);
    this.formData.append('country_id', data.country_id);
    this.formData.append('zone_id', data.zone_id);
    this.formData.append('default', data.default);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  editAddress(data: any, address_id): any {
    this.URL = ConfigProvider.BASE_URL + 'address/edit&customer_id=' + ConfigProvider.CUSTOMER_ID + '&address_id=' + address_id + '&api_token=' + ConfigProvider.API_TOKEN;
    this.formData.append('firstname', data.firstname);
    this.formData.append('lastname', data.lastname);
    this.formData.append('company', data.company);
    this.formData.append('address_1', data.address_1);
    this.formData.append('address_2', data.address_2);
    this.formData.append('postcode', data.postcode);
    this.formData.append('city', data.city);
    this.formData.append('country_id', data.country_id);
    this.formData.append('zone_id', data.zone_id);

    if (data.default) {
      this.formData.append('default', data.default);
    } else {
      this.formData.append('default', '');
    }


    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  deleteAddress(address_id): any {
    this.URL = ConfigProvider.BASE_URL + 'address/delete&customer_id=' + ConfigProvider.CUSTOMER_ID + '&address_id=' + address_id + '&api_token=' + ConfigProvider.API_TOKEN;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  getCountry(): any {
    this.URL = ConfigProvider.BASE_URL + 'address/country' + '&api_token=' + ConfigProvider.API_TOKEN;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  getZone(country_id): any {
    this.URL = ConfigProvider.BASE_URL + 'address/zone&country_id=' + country_id + '&api_token=' + ConfigProvider.API_TOKEN;
    return this.http.get(this.URL,
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
