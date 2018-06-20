import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Platform } from 'ionic-angular';
import { ConfigProvider } from '../config/config';
import { Storage } from '@ionic/storage';
import { CustomerModel } from '../../models/customer-model';
import { NativeStorage } from '@ionic-native/native-storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class CustomerProvider {
  private customerModel: CustomerModel = new CustomerModel();

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;
  private agree;
  public db: SQLiteObject;

  public customer_id = 0;
  public customer_group_id = 0;
  public firstname = '';
  public lastname = '';
  public email = '';
  public telephone = '';

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public nativeStorage: NativeStorage,
    public platform: Platform,
    private sqlite: SQLite,
  ) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');

    this.fillData();
  }

  clear() {
    this.customer_id = 0;
    this.customer_group_id = 0;
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.telephone = '';
  }

  fillData() {
    this.getData()
      .then((data) => {
        ConfigProvider.CUSTOMER_ID = data.customer_id;
        this.customer_id = data.customer_id;
        this.customer_group_id = data.customer_group_id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.telephone = data.telephone;
      })
      .catch(e => {
        console.log(e);
      });
  }

  apiRegister(data: any) {

    this.URL = ConfigProvider.BASE_URL + 'customer/register'+ '&api_token=' + ConfigProvider.API_TOKEN;

    this.formData.append('firstname', data.firstname);
    this.formData.append('lastname', data.lastname);
    this.formData.append('email', data.email);
    this.formData.append('telephone', data.telephone);
    this.formData.append('password', data.password);
    this.formData.append('confirm', data.confirm);
    this.formData.append('agree', this.agree);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  apiLogin(data: any) {
    console.log(data);
    this.URL = ConfigProvider.BASE_URL + 'customer/login'+ '&api_token=' + ConfigProvider.API_TOKEN;

    this.formData.append('email', data.email);
    this.formData.append('telephone', data.telephone);
    this.formData.append('password', data.password);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  setData(data) {
    return this.storage.set('myData', data).then(
      () => {
        console.log('Stored item!');
        this.fillData();
        return true;
      },
      error => {
        console.error('Error storing item', error);
        return false;
      }
    );
  }

  unSetData() {
    return this.storage.remove('myData').then(
      () => {
        console.log('Stored item remove!');
        this.clear();
        return true;

      },
      error => {
        console.error('Error storing item remove', error);
        return false;
      }
    );
  }

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.get('myData')
        .then((data) => {
          resolve(data);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }


  // db
  connectDb() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default',
      createFromLocation: 1
    })
      .then((db: SQLiteObject) => {
        this.db = db;
        return Promise.resolve();
      })
      .catch(e => {
        console.log(e);
      });
  }

  createTable() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.db.executeSql('CREATE TABLE IF NOT EXISTS customer(id INTEGER PRIMARY KEY,customer_id INT,customer_group_id INT,firstname VARCHAR(32),lastname VARCHAR(32),email VARCHAR(200),telephone VARCHAR(20))', {})
          .then(() => {
            console.log('Executed SQL');
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  }

  insertTable(data) {
    this.db.executeSql('DELETE FROM customer', {});
    this.db.executeSql('INSERT INTO customer VALUES(NULL,?,?,?,?,?,?)',
      [data.customer_id,
      data.customer_group_id,
      data.firstname,
      data.lastname,
      data.email,
      data.telephone])
      .then(() => {
        console.log('Executed SQL');
      })
      .catch(e => {
        console.log(e);
      });
  }

  getTable(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.executeSql('SELECT * FROM customer', {})
        .then((data) => {
          const places = [];
          places.push(data.rows.item(0));
          resolve(places);
        })
        .catch(e => {
          console.log(e);
          reject(e);
        });
    });
  }

  private execSqlCustom = (sqlToExecute: string, bracketValues: Array<any>): Promise<any> => {
    return new Promise(function (resolve, reject) {
      this.db.transaction(
        function (tx) {
          tx.executeSql(sqlToExecute, bracketValues, success, error);
          function success(tx, rs) {
            resolve(rs);
          }
          function error(tx, error) {
            console.log('execSqlCustom error ' + error.message);
            reject(error);
          }
        }
      )
    }.bind(this));
  }







}
