import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth/services/auth.service.service';
import { ClientServiceService } from '../../services/client-service.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent {
  constructor(private fb: FormBuilder,
  private service_auth: AuthServiceService,
  private service: ClientServiceService) { }

  changepassForm!: FormGroup;
  editprofileForm!: FormGroup;
  @Input() type: string = "User"
  userToken!: string;
  name: any = {}

  ngOnInit(): void {
    this.changepassForm = this.fb.group({
      currentPassword: [null, Validators.required],
      newpass: [null, [Validators.required, Validators.minLength(8)]],
      confirmpass: [null, Validators.required]
    })

    this.editprofileForm = this.fb.group({
      fullname: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      address: [null, Validators.required],
      number: [null, [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]]
    })

    this.getUserbyID_Here();
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
      name: this.editprofileForm.value.fullname,
      email: this.editprofileForm.value.email,
      address: this.editprofileForm.value.address,
      phoneNumber: this.editprofileForm.value.number
    }
    this.service.changeUserData(model).subscribe((res: any) => {
      res = alert("success")
    },
    error => {
     alert("Couldn't change user information")
   })
  }

  Submit_pass() {
    const model = {
      password: this.changepassForm.value.newpass
    }
    this.service.changeUserpassword(model).subscribe((res: any) => {
      res = alert("success")
    },
    error => {
     alert("Couldn't Change User password")
   })
  }

  getUserbyID_Here() {
    this.service.getUserbyID(this.userToken).subscribe((res: any) => {
      res = this.name
      res = alert("Welcome To Your Profile")
    },
    error => {
     alert("Couldn't get User profile")
   })
  }
}
