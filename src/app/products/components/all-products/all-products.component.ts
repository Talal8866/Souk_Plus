import { Component } from '@angular/core';
import { ProductserviceService } from '../../services/productservice.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {
  constructor(
    private Products_service: ProductserviceService
  ) {}

  name: string | null = '';
  cart_products: any[] = [];
  shopProducts: any[] = [];
  categories: any[] = [];
  products: any[] = [];

  ngOnInit() {
    this.getProducts_Here();
    this.getCategories_Here();
    if (this.name) { 
      this.getShopProducts_Here();
    }
  }

  filtercategory(event: any) {
    let value = event.target.value;
    if (value == "all") {
      this.getProducts_Here();
    }
    else {
      this.getProducts_byCategories_Here(value);
    }
  }

  getProducts_Here() {
    this.Products_service.getProducts().subscribe((res: any) => {
      this.products = res.products || res; 
    }, error => {
      alert("couldn't get all products");
    });
  }

  getShopProducts_Here() {
    this.Products_service.getPublicShopProfile(this.name!).subscribe((res: any) => {
      this.shopProducts = res.products || res; 
    }, error => {
      alert("couldn't get shops products");
    });
  }

  getCategories_Here() {
    this.Products_service.getAllCategories().subscribe((res: any) => {
      this.categories = res.categories || res; 
    }, error => {
      alert("couldn't get categories");
    });
  }

  getProducts_byCategories_Here(keyWord: string) {
    this.Products_service.getProducts_byCategories(keyWord).subscribe((res: any) => {
      this.products = res.products || res;
    });
  }
  
  addtocart(event: { item: any, quantity: number }) {
    console.log('Adding to cart in parent:', event); // Debug log
    if ("cart" in localStorage) {
      this.cart_products = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cart_products.find(item => item.item._id == event.item._id);
      if (exist) {
        alert("The Product is Already in your Cart");
      } else {
        this.cart_products.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cart_products));
        console.log('Updated cart products:', this.cart_products); // Debug log
      }
    } else {
      this.cart_products = [event];
      localStorage.setItem("cart", JSON.stringify(this.cart_products));
      console.log('Initialized cart with:', this.cart_products); // Debug log
    }
  }
  
}
