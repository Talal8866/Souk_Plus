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

  constructor(private fb: FormBuilder, private service_auth: AuthServiceService, private service: ClientServiceService) { }

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
      fullname: [null, Validators.required],
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
      fullname: this.editprofileForm.value.fullname,
      email: this.editprofileForm.value.email,
      address: this.editprofileForm.value.address,
      number: this.editprofileForm.value.number
    }
    this.service.changeUserData(model).subscribe(res => {
      alert("success")
    })
  }

  Submit_pass() {
    const model = {
      newpass: this.changepassForm.value.newpass
    }
    this.service.changeUserpassword(model).subscribe(res => {
      alert("success")
    })
  }
}
