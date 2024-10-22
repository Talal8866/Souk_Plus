import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../../services/productservice.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  constructor(private route: ActivatedRoute, private service: ProductserviceService) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  id: any;
  data: any = {}

  ngOnInit(): void {
    this.getProductByID_Here();
  }

  getProductByID_Here() {
    this.service.getProductByID(this.id).subscribe(res => {
      this.data = res
    })
  }
}
