import { Component, Input } from '@angular/core';
import { HomeServiceService } from '../../services/home-service.service';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.css']
})
export class ContentsComponent {
  constructor(
    private service: HomeServiceService
  ) { }

  feturedProducts: any[] = [];
  cart_products: any[] = [];
  feturedShops: any[] = [];


  ngOnInit() {
    this.getFeturedProducts_Here();
    this.getFeturedShops_Here();
  }

  getFeturedProducts_Here() {
    this.service.getFeaturedProducts().subscribe((res: any) => {
      this.feturedProducts = res.products; // Assign response data to feturedProducts
      console.log(this.feturedProducts);
    });
  }

  getFeturedShops_Here() {
    this.service.getFeaturedShops().subscribe((res: any) => {
      this.feturedShops = res.shops; // Assign response data to feturedShops
      console.log(this.feturedShops);
    });
  }
  
  addtocart(event: { item: any, quantity: number }) {
    console.log('Adding to cart in parent:', event);
    if ("cart" in localStorage) {
      this.cart_products = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cart_products.find(item => item.item._id == event.item._id);
      if (exist) {
        alert("The Product is Already in your Cart");
      } else {
        this.cart_products.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cart_products));
        console.log('Updated cart products:', this.cart_products); 
      }
    } else {
      this.cart_products = [event];
      localStorage.setItem("cart", JSON.stringify(this.cart_products));
      console.log('Initialized cart with:', this.cart_products); 
    }
  }
}
