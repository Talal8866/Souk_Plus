import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
<<<<<<< HEAD
  constructor(private http: HttpClient) {}
  private token: string = '';
  private currentUser: any = null;
=======

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

>>>>>>> 4c02cb183a8ce7fda41d4d2fa8a48bedbfef61ee
  user = new Subject();
  
  createuser_service(model: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/register', model); //done
  }

  createshop_service(model: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/shops/register', model); //done
  }

  loginuser_service(model: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/login', model); //done
  }

  loginshop_service(model: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/shops/login', model); //done
  }

  // handing Token
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return this.token || localStorage.getItem('token') || '';
  }

  setCurrentUser(user: any): void {
    this.currentUser = user;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
