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
import { AllShopsComponent } from './shop/components/all-shops/all-shops.component';
import { ShopCardComponent } from './shared/components/shop-card/shop-card.component';
import { ShopSignupComponent } from './auth/components/shop-signup/shop-signup.component';
import { WishlistComponent } from './client/components/wishlist/wishlist.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { UpdateProductComponent } from './products/components/update-product/update-product.component';
import { AddProductComponent } from './products/components/add-product/add-product.component';

const routes: Routes = [
  { path: "", component: ContentsComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "shop-signup", component: ShopSignupComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "header", component: HeaderComponent },
  { path: "footer", component: FooterComponent },
  { path: "product", component: ProductComponent },
  { path: "product-details/:id", component: ProductDetailsComponent },
  { path: "cart-details", component: CartDetailsComponent },
  { path: "profile/:id", component: ProfileComponent },
  { path: "edit-profile", component: EditProfileComponent },
  { path: "all-shops", component: AllShopsComponent },
  { path: "shop-card", component: ShopCardComponent },
  { path: "client-details", component: ClientDetailsComponent },
  { path: "wishlist", component: WishlistComponent },
  { path: "all-products", component: AllProductsComponent },
  { path: "update-product", component: UpdateProductComponent },
  { path: "add-product", component: AddProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }

