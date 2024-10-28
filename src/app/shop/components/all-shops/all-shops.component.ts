import { Component, Input } from '@angular/core';
import { ProductserviceService } from 'src/app/products/services/productservice.service';
import { ShopServiceService } from '../../services/shop-service.service';

@Component({
  selector: 'app-all-shops',
  templateUrl: './all-shops.component.html',
  styleUrls: ['./all-shops.component.css']
})
export class AllShopsComponent {
  constructor(private product_servive: ProductserviceService, private shop_service: ShopServiceService) { }

  @Input() categories: any[] = [];
  shops: any[] = [];

  ngOnInit() {
    this.getShops_Here()
    this.getCategories_Here()
  }

  filtercategory(event: any) {
    let value = event.target.value;
    if (value == "all") {
      this.getShops_Here()
    }
    else {
      this.getShops_byCategories_Here(value)
    }
  }

  getShops_Here() {
    this.product_servive.getShops().subscribe((res: any) => {
      this.shops = res;
    },
    //  error => {
    //   alert("error")
    // }
   )
  }

  getCategories_Here() {
    this.product_servive.getAllCategories().subscribe((res: any) => {
      this.shops = res;
    },
    //  error => {
    //   alert("error")
    // }
   )
  }

  getShops_byCategories_Here(keyWord: string) {
    this.product_servive.getShops_byCategories(keyWord).subscribe((res: any) => {
      this.shops = res;
    })
  }
}
