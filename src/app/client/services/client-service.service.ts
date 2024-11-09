import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http: HttpClient) { }

  changeUserData(model: any) {
    return this.http.post('http://localhost:3000/api/users/update', model);
  }

  changeUserpassword(model: any) {
    return this.http.post('http://localhost:3000/api/users/change-password', model);
  }

  getUserbyID(userToken: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get('http://localhost:3000/api/users/profile', { headers });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
