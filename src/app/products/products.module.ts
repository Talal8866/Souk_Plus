import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SharedModule } from '../shared/shared.module';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    AllProductsComponent,
    UpdateProductComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    
  ],
  exports: [
    ProductDetailsComponent,
    AllProductsComponent,
    UpdateProductComponent,
    AddProductComponent
  ]
})
export class ProductsModule { }
