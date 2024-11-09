import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  constructor() { }

  @Input() products: any[] = [];
  @Input () shopProducts: any[] = [];
  @Output() item = new EventEmitter();

  addbutton: boolean = false;
  amount: number = 0;

  add() {
    this.item.emit({ item: this.products, quantity: this.amount })  
  }

  ngOnInit(): void {
  }
}
