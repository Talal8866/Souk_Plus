import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from 'src/app/products/services/productservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private route: ActivatedRoute, private service: ProductserviceService) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  id: any;
  data: any = {}

  ngOnInit(): void {
    this.getShopByID_Here();
  }

  getShopByID_Here() {
    this.service.getShopByID(this.id).subscribe(res => {
      this.data = res
    })
  }
}
