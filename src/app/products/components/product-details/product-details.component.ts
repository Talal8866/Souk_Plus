import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductserviceService } from '../../services/productservice.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private service: ProductserviceService,
    private route: ActivatedRoute
) {}

  @Output() item = new EventEmitter<{ item: any, quantity: number }>();
  @Output() wish_item = new EventEmitter();
  // @Output() item = new EventEmitter();
  @Input() products: any = {};
  @Input() product: any;

  _id: string | null = '';
  amount: number = 0;
  data: any = {};

  ngOnInit(): void {
    this._id = this.route.snapshot.paramMap.get('productId');
    console.log('Captured ID:', this._id); 
    if (this._id) {
      this.getProductByID_Here(this._id);
    } else {
      console.error('Product ID is undefined');
    }
  }

  getProductByID_Here(id: string) {
    this.service.getProductByID(id).subscribe(res => {
      this.data = res;
      this.product = res; // Ensure this.product is set
    }, error => {
      console.error('Error fetching product details:', error);
    });
  }
  
  // addto_Cart() {
  //   this.item.emit({ item: this.data, quantity: this.amount });
  // }

  add() {
    if (this.product) {
      console.log('Adding to cart:', this.product, this.amount);
      this.item.emit({ item: this.product, quantity: this.amount });
    } else {
      console.error('Product is undefined');
    }
  }
  
  addto_wishlist() {
    if (this.product) {
      console.log('Adding to wishlist:', this.product);
      this.wish_item.emit({ wish_item: this.product });
    } else {
      console.error('Product is undefined');
    }
  }
  
}
