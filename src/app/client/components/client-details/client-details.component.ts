import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/auth/services/auth.service.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent {
  changepassForm!: FormGroup;
  editprofileForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: AuthServiceService) { }

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
      number: [null, Validators.required]
    })
  }

  logout() {
    const model = {}
    this.service.loginuser_service(model).subscribe((res: any) => {
      // this.user = null
      this.service.user.next(res)
    })
  }

  Submit_Changes() { }

  Submit_pass() { }
}
