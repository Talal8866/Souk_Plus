import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { AllProductsComponent } from './components/all-products/all-products.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    AllProductsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    
  ],
  exports: [
    ProductDetailsComponent,
    AllProductsComponent
  ]
})
export class ProductsModule { }
