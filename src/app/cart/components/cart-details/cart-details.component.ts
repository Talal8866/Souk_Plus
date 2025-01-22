import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/services/auth.service.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  constructor(private service_auth: AuthServiceService) {}

  @Input() type: string = "user";

  cart_products: any[] = [];
  Shipping: any = 30000;
  Discount: any = 0;
  total: any = 0;
  tax: any = 0;

  ngOnInit(): void {
    this.getCartProducts();
  }

  logout() {
    if (this.type === 'user') {
      this.service_auth.logoutuser_service().subscribe(
        (res: any) => {
          alert("You have logged out");
          this.service_auth.setCurrentUser(null);
          console.log(res);
        },
        (error: any) => {
          console.error('Error during user logout:', error);
        }
      );
    } else {
      this.service_auth.logoutshop_service().subscribe(
        (res: any) => {
          alert("You have logged out");
          this.service_auth.setCurrentUser(null); 
          console.log(res);
        },
        (error: any) => {
          console.error('Error during shop logout:', error);
        }
      );
    }
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cart_products = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.total = 0;
    for (let x in this.cart_products) {
      this.total += this.cart_products[x].item.price * this.cart_products[x].quantity;
    }
    this.getTax();
  }

  add_Quantity(index: number) {
    this.cart_products[index].quantity++;
    this.getTotalPrice();
    localStorage.setItem("cart", JSON.stringify(this.cart_products));
  }

  minus_Quantity(index: number) {
    this.cart_products[index].quantity--;
    this.getTotalPrice();
    localStorage.setItem("cart", JSON.stringify(this.cart_products));
  }

  detectChange() {
    localStorage.setItem("cart", JSON.stringify(this.cart_products));
  }

  deleteProduct(index: number) {
    this.cart_products.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.cart_products));
    this.getTotalPrice();
  }

  getTax() {
    let taxRate = 0.05;
    this.tax = taxRate * this.total;
  }

  addProductToCart(event: { item: any, quantity: number }) {
    console.log('Adding product to cart:', event);
    const product = event.item;
    const existingProduct = this.cart_products.find(p => p.item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += event.quantity;
    } else {
      this.cart_products.push({ item: product, quantity: event.quantity });
    }
    this.getTotalPrice();
    localStorage.setItem("cart", JSON.stringify(this.cart_products));
    console.log('Cart updated:', this.cart_products); 
  }  

  proceed_to_Checkout(){
    alert("Success")
  }
}
