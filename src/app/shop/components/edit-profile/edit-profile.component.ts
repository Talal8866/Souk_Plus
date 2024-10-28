import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth/services/auth.service.service';
import { ShopServiceService } from '../../services/shop-service.service';
import { ProductserviceService } from 'src/app/products/services/productservice.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private fb: FormBuilder, private service_auth: AuthServiceService,
    private shop_servive: ShopServiceService, private Products_service: ProductserviceService) { }

  changepassForm!: FormGroup;
  editprofileForm!: FormGroup;
  @Input() type: string = "User"
  @Input() shopProducts: any[] = [];
  name: any = {}

  ngOnInit(): void {
    this.changepassForm = this.fb.group({
      currentPassword: [null, Validators.required],
      newpass: [null, [Validators.required, Validators.minLength(8)]],
      confirmpass: [null, Validators.required]
    })

    this.editprofileForm = this.fb.group({
      name: [null],
      shopCategory: [null],
      email: [null],
      address: [null],
      number: [null, [Validators.pattern(/^\+?[1-9]\d{1,14}$/)]]
    })

    this.getShopByID_Here();
    this.getShopProducts_Here();
  }

  logout() {
    if (this.type === 'user') {
      this.service_auth.logoutuser_service().subscribe(
        (res: any) => {
          alert("You have logged out");
          this.service_auth.setCurrentUser(null); // Clear current user
          console.log(res);
        },
        (error: any) => {
          console.error('Error during user logout:', error);
        }
      );
    } else {
      this.service_auth.logoutshop_service().subscribe(
        (res: any) => {
          alert("You have logged out");
          this.service_auth.setCurrentUser(null); // Clear current user
          console.log(res);
        },
        (error: any) => {
          console.error('Error during shop logout:', error);
        }
      );
    }
  }

  Submit_Changes() {
    const model = {
      name: this.editprofileForm.value.shopname,
      shopCategory: this.editprofileForm.value.shopcategory,
      email: this.editprofileForm.value.email,
      address: this.editprofileForm.value.address,
      phoneNumber: this.editprofileForm.value.number
    }
    this.shop_servive.changeShopData(model).subscribe(res => {
      alert("success")
    })
  }

  Submit_pass() {
    const model = {
      password: this.changepassForm.value.newpass
    }
    this.shop_servive.changeShoppassword(model).subscribe(res => {
      alert("success")
    })
  }

  getShopByID_Here() {
    this.Products_service.getShopByID(this.name).subscribe(res => {
      this.name = res
    })
  }

  getShopProducts_Here() {
    this.shop_servive.getShopProducts(this.name).subscribe((res: any) => {
      this.shopProducts = res;
    });
  }

  delete_Product(item: any) {
    this.shop_servive.deleteProduct(item).subscribe((res: any) => {
      res = alert("The Product Deleted Successfully");
    });
  }
}
