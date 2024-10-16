import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  // private apiUrl = 'https://your-api-url/products'; 

  // constructor(private http: HttpClient) { }

  // getProducts(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

}
