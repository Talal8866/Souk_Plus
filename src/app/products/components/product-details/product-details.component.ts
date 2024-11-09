import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() item = new EventEmitter();
  @Output() wish_item = new EventEmitter();
  @Input() products: any = {};

  id: any;
  data: any = {}
  amount: number = 0;

  ngOnInit(): void {
    this.getProductByID_Here();
  }

  getProductByID_Here() {
    this.service.getProductByID(this.id).subscribe(res => {
      this.data = res
    })
  }

  addto_Cart() {
    this.item.emit({ item: this.products, quantity: this.amount }) 
  }

  addto_wishlist(){
    this.wish_item.emit({ wish_item: this.products }) 
  }
}
