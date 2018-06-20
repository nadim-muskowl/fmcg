import { NgModule } from '@angular/core';
import { CustomerAddressComponent } from './customer-address/customer-address';
import { CartComponent } from './cart/cart';

@NgModule({
    declarations: [
        CustomerAddressComponent,
        CartComponent,
    ],
    imports: [],
    exports: [
        CustomerAddressComponent,
        CartComponent,

    ]
})
export class ComponentsModule { }
