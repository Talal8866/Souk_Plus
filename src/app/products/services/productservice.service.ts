import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get('http://localhost:3000/api/categories'); // done
  }

  // products services:
  getProducts() {
    return this.http.get('http://localhost:3000/api/products'); // done
  }

  getProducts_byCategories(keyWord: string) {
    return this.http.get('http://localhost:3000/api/products/:category' + keyWord); // done
  }

  getProductByID(id: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`); //done
    return this.http.get(`http://localhost:3000/api/:products/${id}`, { headers });
  }

  // shops services:
  getShops() {
    return this.http.get('http://localhost:3000/api/shops'); // done
  }

  getShops_byCategories(keyWord: string) {
    return this.http.get('http://localhost:3000/api/shops' + keyWord);
  }

  getShopByID(name: String) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get(`http://localhost:3000/api/shops/profile${name}`, { headers }); //done
  }

  // getting Token for products(id) and shops(id)
  getToken() {
    return localStorage.getItem('token');
  }

}
