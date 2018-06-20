import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShippingMethodPage } from './shipping-method';

@NgModule({
  declarations: [
    ShippingMethodPage,
  ],
  imports: [
    IonicPageModule.forChild(ShippingMethodPage),
  ],
})
export class ShippingMethodPageModule {}
