import { NgModule } from '@angular/core';
import { CustomerAddressComponent } from './customer-address/customer-address';
import { CartComponent } from './cart/cart';
import { ProductReviewComponent } from './product-review/product-review';

@NgModule({
    declarations: [
        CustomerAddressComponent,
        CartComponent,
    ProductReviewComponent,
    ],
    imports: [],
    exports: [
        CustomerAddressComponent,
        CartComponent,
    ProductReviewComponent,

    ]
})
export class ComponentsModule { }
