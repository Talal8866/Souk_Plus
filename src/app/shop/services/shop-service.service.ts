import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {

  constructor(private http: HttpClient) { }

  changeShopData(model: any) {
    return this.http.post('api', model)
  }

  changeShoppassword(model: any) {
    return this.http.post('api', model)
  }
}
