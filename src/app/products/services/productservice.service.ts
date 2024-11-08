import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {
  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get('http://localhost:3000/api/categories');
  }

  getProducts() {
    return this.http.get('http://localhost:3000/api/products');
  }

  getProducts_byCategories(keyWord: string) {
    return this.http.get(`http://localhost:3000/api/products/list/:${keyWord}`);
  }

  getProductByID(id: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`); 
    return this.http.get(`http://localhost:3000/api/products/:${id}`, { headers });
  }

  getShops() {
    return this.http.get('http://localhost:3000/api/shops');
  }

  getShops_byCategories(keyWord: string) {
    return this.http.get(`http://localhost:3000/api/shops/category/${keyWord}`);
  }

  getPublicShopProfile(keyWord: string) {
    return this.http.get(`http://localhost:3000/api/shops/${keyWord}`);
  }

  getShopByID(name: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get(`http://localhost:3000/api/shops/profile/${name}`, { headers });
    console.log(headers)
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
