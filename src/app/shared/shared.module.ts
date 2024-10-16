import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from '../routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ShopCardComponent } from './components/shop-card/shop-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    ShopCardComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RoutingModule,
    RouterModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    RoutingModule,
    ShopCardComponent
    ]
})
export class SharedModule { }
