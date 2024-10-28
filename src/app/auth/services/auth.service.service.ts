import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) { }
  private token: string = '';
  private currentUser: any = null;
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

  logoutuser_service(): Observable<any> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post('http://localhost:3000/api/users/logout', {}, { headers });
  }

  loginshop_service(model: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/shops/login', model); //done
  }

  logoutshop_service(): Observable<any> {
    const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.http.post('http://localhost:3000/api/shops/logout', {}, { headers });
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
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('currentUser');
      this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    }
    return this.currentUser;
  }
}
