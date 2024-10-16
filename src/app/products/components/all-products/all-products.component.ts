import { Component } from '@angular/core';
import { ProductserviceService } from '../../services/productservice.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {

  // products: any[] = [];

  // constructor(private productService: ProductserviceService) { }

  // ngOnInit(): void {
  //   this.productService.getProducts().subscribe((data: any[]) => {
  //     this.products = data;
  //   });
  // }

}
