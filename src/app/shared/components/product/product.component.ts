import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductserviceService } from 'src/app/products/services/productservice.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor(private servive: ProductserviceService) { }

  @Input() products: any = {};
  @Input() categories: any = {};
  @Input () shopProducts: any[] = [];
  @Output() item = new EventEmitter();

  addbutton: boolean = false;
  amount: number = 0;

  add() {
    this.item.emit({ item: this.products, quantity: this.amount })  // sending the product data as an objict
  }

  ngOnInit(): void {

  }

}
