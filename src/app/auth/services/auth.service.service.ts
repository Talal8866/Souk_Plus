import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  createuser_service(model: object) {
    return this.http.post('api', model)
  }

  loginuser_service(model: object) {
    return this.http.put('api', model) //+login/1
  }

  getusers_servive(model: object) {
    return this.http.get('api') // + type
  }

  user = new Subject();
  get_role() {
    return this.http.get('api') //+login/1
  }

}
