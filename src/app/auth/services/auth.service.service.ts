import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  createuser_service(model: any) {
    return this.http.post('http://localhost:3000/api/users/register', model)  // done
  }

  createshop_service(model: any) {
    return this.http.post('http://localhost:3000/api/shop/register', model) // done
  }

  loginuser_service(model: any) {
    return this.http.post('http://localhost:3000/api/user/login', model) // done
  }

  loginshop_service(model: any) {
    return this.http.post('http://localhost:3000/api/shop/login', model) // done
  }

  user = new Subject();

}
