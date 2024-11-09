import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {
  constructor(private http: HttpClient) { }

  changeShopData(model: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.patch(`http://localhost:3000/api/shops/profile/update${model}`, { headers }); // except description and logo
  }

  changeShoppassword(model: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.post(`http://localhost:3000/api/shops/profile/change-password${model}`, { headers }); 
  }

  getShopProducts(name: String) {
    return this.http.get('http://localhost:3000/api/products/:shopName' + name) 
  }

  deleteProduct(id: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`); 
    return this.http.delete(`http://localhost:3000/api/products/:productId${id}`, { headers });
  }

  updateProduct(id: any, model: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`); 
    return this.http.post(`http://localhost:3000/api/products${id}`, { headers }, model);
  }

  addProduct(id: any, model: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`); 
    return this.http.post(`http://localhost:3000/api/products${id}`, { headers }, model);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
