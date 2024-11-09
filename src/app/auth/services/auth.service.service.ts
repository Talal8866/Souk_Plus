import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) { }

  createuser_service(model: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/register', model);
  }

  createshop_service(formData: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/shops/register', formData);
  }

  loginuser_service(model: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/users/login', model);
  }

  logoutuser_service(): Observable<any> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post('http://localhost:3000/api/users/logout', {}, { headers });
  }

  loginshop_service(model: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/shops/login', model);
  }

  logoutshop_service(): Observable<any> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post('http://localhost:3000/api/shops/logout', {}, { headers });
  }

  private token: string = '';
  private currentUser: any = null;
  user = new Subject();

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }
  getToken(): string {
    return this.token || localStorage.getItem('token') || '';
  }
  setCurrentUser(user: any): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  getCurrentUser(): any {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      return null;
    }
    try {
      this.currentUser = JSON.parse(storedUser);
    } catch (e) {
      this.currentUser = null;
    } return this.currentUser;
  }
}
