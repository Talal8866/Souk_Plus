import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private routes: Router, private service: AuthServiceService) { }

  loginForm!: FormGroup;
  users: any[] = [];
  type: string = 'User';
  showPassword = false;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      pass: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      type: new FormControl(this.type)
    });
  }

  getRole(event: any) {
    this.type = event.target.value;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  Submit() {
    const model = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.pass,
    };

    const loginService = this.type === 'user'
      ? this.service.loginuser_service(model)
      : this.service.loginshop_service(model);

    loginService.subscribe(
      (res: any) => {
        console.log('Login response:', res);
        this.service.setToken(res.token);
        this.service.setCurrentUser(res.user);
        alert('Success');
        console.log(res);
        const navigateTo = this.type === 'user' ? '/client-details' : '/edit-profile';
        this.routes.navigate([navigateTo]);
      },
      err => {
        console.error(err);
      }
    );
  }

  getButtonStyles() {
    return this.loginForm.invalid
      ? { 'background-color': 'var(--mid-gray)', 'cursor': 'not-allowed', 'color': 'var(--custom-white)' }
      : { 'background-color': 'var(--dark-maincolor)', 'cursor': 'pointer', 'color': 'var(--custom-white)' };
  }
}
