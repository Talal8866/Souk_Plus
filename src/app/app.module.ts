import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ShopModule } from './shop/shop.module';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { ClientModule } from './client/client.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    ShopModule,
    ProductsModule,
    HomeModule,
    ClientModule,
    CartModule,
    AuthModule,
    RoutingModule,
    RouterModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }