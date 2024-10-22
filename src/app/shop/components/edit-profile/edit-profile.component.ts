import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth/services/auth.service.service';
import { ClientServiceService } from 'src/app/client/services/client-service.service';
import { ShopServiceService } from '../../services/shop-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  constructor(private fb: FormBuilder, private service_auth: AuthServiceService, private service: ShopServiceService) { }

  changepassForm!: FormGroup;
  editprofileForm!: FormGroup;

  @Input() type: string = "User"

  ngOnInit(): void {
    this.changepassForm = this.fb.group({
      currentPassword: [null, Validators.required],
      newpass: [null, [Validators.required, Validators.minLength(8)]],
      confirmpass: [null, Validators.required]
    })

    this.editprofileForm = this.fb.group({
      shopname: [null, Validators.required],
      shopcategory: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      address: [null, Validators.required],
      number: [null, [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]]
    })
  }

  logout() {
    const model = {};

    if (this.type === 'User') {
      this.service_auth.loginuser_service(model).subscribe(
        (res: any) => {
          this.service_auth.user.next(res);
        },
        (error: any) => {
          console.error('Error during user logout:', error);
        }
      );
    } else {
      this.service_auth.loginshop_service(model).subscribe(
        (res: any) => {
          this.service_auth.user.next(res);
        },
        (error: any) => {
          console.error('Error during shop logout:', error);
        }
      );
    }
  }


  Submit_Changes() {
    const model = {
      shopname: this.editprofileForm.value.shopname,
      shopcategory: this.editprofileForm.value.shopcategory,
      email: this.editprofileForm.value.email,
      address: this.editprofileForm.value.address,
      number: this.editprofileForm.value.number
    }
    this.service.changeShopData(model).subscribe(res => {
      alert("success")
    })
  }

  Submit_pass() {
    const model = {
      newpass: this.changepassForm.value.newpass
    }
    this.service.changeShoppassword(model).subscribe(res => {
      alert("success")
    })
  }

}
