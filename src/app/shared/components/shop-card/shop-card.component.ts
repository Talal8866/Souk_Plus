import { Component, Input } from '@angular/core';
import { ProductserviceService } from 'src/app/products/services/productservice.service';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent {
  constructor(private servive: ProductserviceService) { }

  @Input() shops: any[] = [];
  @Input() categories: any[] = [];
}
