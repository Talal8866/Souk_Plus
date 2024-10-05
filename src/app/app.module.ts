import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ShopModule } from './shop/shop.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { ClientModule } from './client/client.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ShopModule,
    ProductsModule,
    HomeModule,
    ClientModule,
    CartModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
