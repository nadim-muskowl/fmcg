import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public showSearchbar: boolean = false;

  constructor(
    public navCtrl: NavController,
  ) {
    this.showSearchbar = false;
  }

  public toggleSearchbar(): void {
    this.showSearchbar = this.showSearchbar ? false : true;
  }






}
