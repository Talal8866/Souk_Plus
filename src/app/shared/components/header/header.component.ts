import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatusService } from '../../services/auth-status.service';
import { AuthServiceService } from 'src/app/auth/services/auth.service.service';
import { ClientServiceService } from 'src/app/client/services/client-service.service';
import { ProductserviceService } from 'src/app/products/services/productservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private productService: ProductserviceService,
    private authStatusService: AuthStatusService,
    private clientService: ClientServiceService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  isShopOwner: boolean = false;
  isClient: boolean = false;
  searchResults: any[] = [];
  searchError: string = '';
  currentUser: any = null;
  products: any[] = [];
  shops: any[] = [];
  shop: any = {};
  user: any = {};
  searchInputStyle: any = {}; // Add this property to hold dynamic styles

  ngOnInit(): void {
    this.authStatusService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.isShopOwner = user.type === 'shop';
        this.isClient = user.type === 'user';

        if (this.isShopOwner) {
          this.getShopName(user.id);
        } else if (this.isClient) {
          this.getUserName(user.id);
        }
      } else {
        this.isShopOwner = false;
        this.isClient = false;
        this.shop = {};
        this.user = {};
      }
    });

    this.productService.getProducts().subscribe(
      (response: any) => {
        if (response.products && Array.isArray(response.products)) {
          this.products = response.products;
        } else if (Array.isArray(response)) {
          this.products = response;
        } else {
          console.error('Unexpected product data format:', response);
        }
      },
      error => {
        this.searchError = 'Error fetching all products';
        console.error(error);
      }
    );

    this.productService.getShops().subscribe(
      (response: any) => {
        if (response.shops && Array.isArray(response.shops)) {
          this.shops = response.shops;
        } else if (Array.isArray(response)) {
          this.shops = response;
        } else {
          console.error('Unexpected shop data format:', response);
        }
      },
      error => {
        console.error('Error fetching all shops:', error);
      }
    );
  }

  getUserName(userId: string) {
    this.clientService.getUserbyID().subscribe(res => {
      this.authService.setCurrentUser(res);
      this.user = res;
    }, error => {
      console.error('Error fetching user name:', error);
    });
  }

  getShopName(shopId: string) {
    this.productService.getShopByID().subscribe(res => {
      this.authService.setCurrentUser(res);
      this.shop = res;
    }, error => {
      console.error('Error fetching shop name:', error);
    });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;

    if (!searchTerm) {
      this.searchResults = [];
      return;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    this.searchResults = [
      ...this.products.filter(product => product.name && product.name.toLowerCase().includes(lowerCaseSearchTerm)),
      ...this.shops.filter(shop => shop.name && shop.name.toLowerCase().includes(lowerCaseSearchTerm))
    ];
  }

  onFocus() {
    this.searchInputStyle = {
      border: '2px solid blue',
      backgroundColor: '#f0f0f0',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      outline: 'none'
    };
  }

  onBlur() {
    this.searchInputStyle = {
      border: '',
      backgroundColor: '',
      boxShadow: '',
      outline: ''
    };
  }

  logout() {
    this.authService.logout();
    this.authStatusService.clearCurrentUser();
    this.router.navigate(['/login']);

    this.isShopOwner = false;
    this.isClient = false;
    this.shop = {};
    this.user = {};
  }
}
