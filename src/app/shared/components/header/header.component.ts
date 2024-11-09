import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/services/auth.service.service';
import { ProductserviceService } from 'src/app/products/services/productservice.service';
import { ShopServiceService } from 'src/app/shop/services/shop-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private authService: AuthServiceService,
    private cdr: ChangeDetectorRef,
    private productService: ProductserviceService,
    private shopService: ShopServiceService
  ) { }

  currentUser: any = null;
  isShopOwner: boolean = false;
  isClient: boolean = false;
  name: string = '';
  id: string = '';
  searchResults: any[] = [];
  searchError: string = '';

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.isShopOwner = !!this.currentUser.shop;
      this.isClient = !!this.currentUser.user;
    }
    this.cdr.detectChanges();
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;

    if (!searchTerm) return;

    this.productService.getProductByID(searchTerm).subscribe(
      (productRes: any) => {
        this.searchResults.push(...productRes);
        console.log('Product search results:', productRes);
      }, 
      error => {
        this.searchError = 'Error fetching product results';
        console.error(error);
      }
    );

    this.productService.getShopByID(searchTerm).subscribe(
      (shopRes: any) => {
        this.searchResults.push(...shopRes);
        console.log('Shop search results:', shopRes);
      }, 
      error => {
        this.searchError = 'Error fetching shop results';
        console.error(error);
      }
    );
  }
}
