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
    this.isShopOwner = this.currentUser && this.currentUser.email == this.currentUser.shop.email;
    this.isClient = this.currentUser && this.currentUser.email == this.currentUser.user.email;
  }
}
