import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentsComponent } from './home/components/contents/contents.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AboutUsComponent } from './home/components/about-us/about-us.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ProductComponent } from './shared/components/product/product.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { CartDetailsComponent } from './cart/components/cart-details/cart-details.component';
import { ProfileComponent } from './shop/components/profile/profile.component';
import { EditProfileComponent } from './shop/components/edit-profile/edit-profile.component';
import { ClientDetailsComponent } from './client/components/client-details/client-details.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { AllShopsComponent } from './shop/all-shops/all-shops.component';
import { ShopCardComponent } from './shared/components/shop-card/shop-card.component';

const routes: Routes = [
  { path: "", component: ContentsComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "header", component: HeaderComponent },
  { path: "footer", component: FooterComponent },
  { path: "product", component: ProductComponent },
  { path: "product-details", component: ProductDetailsComponent },
  { path: "cart-details", component: CartDetailsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "edit-profile", component: EditProfileComponent },
  { path: "all-prodcuts", component: AllProductsComponent },
  { path: "all-shops", component: AllShopsComponent },
  { path: "shop-card", component: ShopCardComponent },
  { path: "client-details", component: ClientDetailsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }

