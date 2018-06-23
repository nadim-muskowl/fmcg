import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { ConfigProvider } from '../config/config';

@Injectable()
export class InformationProvider {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(public http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  send(data: any) {
    console.log(data);
    this.URL = ConfigProvider.BASE_URL + 'contact' + '&api_token=' + ConfigProvider.API_TOKEN;

    this.formData.append('name', data.name);
    this.formData.append('email', data.email);
    this.formData.append('enquiry', data.enquiry);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

}
