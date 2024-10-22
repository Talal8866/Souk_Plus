import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private http: HttpClient) { }

  changeUserData(model: any) {
    return this.http.post('http://localhost:3000/api end-point', model)
  }

  changeUserpassword(model: any) {
    return this.http.post('http://localhost:3000/api end-point', model)
  }

}
