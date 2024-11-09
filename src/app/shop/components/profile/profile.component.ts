import { Component, Input } from '@angular/core';
import { ProductserviceService } from 'src/app/products/services/productservice.service';
import { ShopServiceService } from '../../services/shop-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private Products_service: ProductserviceService, private shop_servive: ShopServiceService) { }
  @Input() shopProducts: any[] = [];
  name: any = {}

  ngOnInit(): void {
    this.getShopByID_Here();
    this.getShopProducts_Here();
  }

  getShopByID_Here() {
    this.Products_service.getShopByID(this.name).subscribe(res => {
      this.name = res
    })
  }

  getShopProducts_Here() {
    this.shop_servive.getShopProducts(this.name).subscribe((res: any) => {
      this.shopProducts = res;
    });
  }
  
}
