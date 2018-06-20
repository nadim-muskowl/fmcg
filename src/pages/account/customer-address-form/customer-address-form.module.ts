import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerAddressFormPage } from './customer-address-form';

@NgModule({
  declarations: [
    CustomerAddressFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerAddressFormPage),
  ],
})
export class CustomerAddressFormPageModule {}
