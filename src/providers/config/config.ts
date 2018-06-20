import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { AlertProvider } from '../../providers/alert/alert';

@Injectable()
export class ConfigProvider {

  static BASE_URL: string = 'http://beauty.muskowl.com/index.php?route=restapi/';
  // static BASE_URL: string = 'http://localhost/opencart/ecom/index.php?route=restapi/';
  static CUSTOMER_ID = 0;
  static API_TOKEN = '';

  private username = 'Default';
  private key = 'zf4oMM0lMC3kLm1dATOtUZK0d0g28YcZxQ3qOXSEH5mJtrutUPNQkadcwGZockPO0rLRRWIrwZzVHjMs5NmxQygI7Z1QosqpFaxVSi03X2BeJb8Pb6exz7rIwIyYzqYMlEs28eVoA3gutQkUBabc0TzW2xJLG8AZZl59NNWZlf6AqHnGzGR2NDloa4Rb73XVHuNlKmkSMxyKBJikxKLOEkqqVt1opqUvSOFFg2m97XXHpmBpw16uAUGtn5jinG7B';
  private URL;
  private headers = new HttpHeaders();
  private formData: FormData = new FormData();
  private responseData;

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public alertProvider: AlertProvider,
  ) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');

    this.getData()
      .then((data) => {
        if (data) {
          ConfigProvider.API_TOKEN = data;
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  public apiLogin() {
    this.getData()
      .then((data) => {
        if (data) {
          ConfigProvider.API_TOKEN = data;
        } else {
          this.URL = ConfigProvider.BASE_URL + 'login&api_token=' + ConfigProvider.API_TOKEN;

          this.formData.append('username', this.username);
          this.formData.append('key', this.key);

          this.http.post(this.URL,
            this.formData,
            {
              headers: this.headers,
            }
          ).subscribe(
            response => {
              // alert(JSON.stringify(response));
              this.responseData = response;

              if (this.responseData.success && this.responseData.success != '') {
                this.alertProvider.title = 'Success';
                this.alertProvider.message = this.responseData.success;
                this.alertProvider.showAlert();
              }

              if (this.responseData.error) {
                if (this.responseData.error && this.responseData.error != '') {
                  this.alertProvider.title = 'Error';
                  this.alertProvider.message = this.responseData.error.ip;
                  this.alertProvider.showAlert();
                }
              }

              ConfigProvider.API_TOKEN = this.responseData.api_token;
              this.setData(this.responseData.api_token);
            },
            err => console.error(err),
            () => {
            }
          );
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  public setData(data) {
    return this.storage.set('API_TOKEN', data).then(
      () => console.log('Stored API_TOKEN!'),
      error => console.error('Error storing API_TOKEN', error)
    );
  }

  public getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('API_TOKEN')
        .then((data) => {
          resolve(data);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }


  public getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
