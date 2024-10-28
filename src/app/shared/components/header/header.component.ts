import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/services/auth.service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private service: AuthServiceService) { }
  currentUser: any = null;
  isShopOwner: boolean = false;
  isClient: boolean = false;

  ngOnInit(): void {
    this.currentUser = this.service.getCurrentUser();
    if (this.currentUser) {
      this.isShopOwner = !!this.currentUser.shop;
      this.isClient = !!this.currentUser.user;
    }
  }
}
