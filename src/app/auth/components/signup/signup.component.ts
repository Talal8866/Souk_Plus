import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm!: FormGroup;

  constructor(private routes: Router, private service: AuthServiceService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      fullname: new FormControl(null, [Validators.required], []),
      email: new FormControl(null, [Validators.required, Validators.email], []),
      address: new FormControl(null, [Validators.required], []),
      number: new FormControl(null, [Validators.required], []),
      pass: new FormControl(null, [Validators.required, Validators.minLength(8)], []),
      confirmpass: new FormControl(null, [Validators.required], []),
    })
  }

  Submit() {
    const model = {
      fullname: this.signupForm.value.fullname,
      email: this.signupForm.value.email,
      address: this.signupForm.value.address,
      number: this.signupForm.value.number,
      pass: this.signupForm.value.pass
    }
  }

}
