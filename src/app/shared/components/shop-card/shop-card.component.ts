import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent {
  constructor() { }

  @Input() categories: any[] = [];
  @Input() shop: any; 

  getImagePath(relativePath: string): string {
    if (!relativePath) {
      return '';
    }
    return `http://localhost:3000/uploads/${relativePath.split('/').pop()}`; 
  }

  get_PublicShopHere(){
    // this.service.getPublicShopProfile().subscribe
  }
}
