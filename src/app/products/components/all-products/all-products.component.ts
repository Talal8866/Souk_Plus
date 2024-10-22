import { Component, Input } from '@angular/core';
import { ProductserviceService } from '../../services/productservice.service';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent {

  constructor(private servive: ProductserviceService) { }

  products: any[] = [];
  categories: any[] = [];
  cart_products: any[] = [];

  ngOnInit() {
    this.getProducts_Here()
    this.getCategories_Here()
  }

  filtercategory(event: any) {
    let value = event.target.value;
    if (value == "all") {
      this.getProducts_Here()
    }
    else {
      this.getProducts_byCategories_Here(value)
    }
  }

  getProducts_Here() {
    this.servive.getProducts().subscribe((res: any) => {
      this.products = res;
    }, error => {
      alert("error")
    })
  }

  getCategories_Here() {
    this.servive.getAllCategories().subscribe((res: any) => {
      this.products = res;
    }, error => {
      alert("error")
    })
  }

  getProducts_byCategories_Here(keyWord: string) {
    this.servive.getProducts_byCategories(keyWord).subscribe((res: any) => {
      this.products = res;
    })
  }

  // JSON.stringify();  //to send json data as it is
  // JSON.pars(); //to recieve json data as it is
  addtocart(event: any) {
    if ("cart" in localStorage) {
      this.cart_products = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cart_products.find(item => item.item.id == event.item.id)
      if (exist) {
        alert("The Product is Already in your Cart")
      }
      else {
        this.cart_products.push(event)
        localStorage.setItem("cart", JSON.stringify(this.cart_products));
      }
    }
    else {
      localStorage.setItem("cart", JSON.stringify(this.cart_products));
    }
  }

}
