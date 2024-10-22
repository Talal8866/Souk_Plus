import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get('http://localhost:3000/api/category'); // done
  }

  // products services:
  getProducts() {
    return this.http.get('api');
  }

  getProducts_byCategories(keyWord: string) {
    return this.http.get('api' + keyWord);
  }

  getProductByID(id: any) {
    return this.http.get('http://localhost:3000/api/product/:productId' + id); // token
  }

  // shops services:
  getShops() {
    return this.http.get('http://localhost:3000/api/shop'); // done
  }

  getShops_byCategories(keyWord: string) {
    return this.http.get('api' + keyWord);
  }

  getShopByID(id: any) {
    return this.http.get('http://localhost:3000/api/shop/profile' + id); // token , user_type
  }

}
