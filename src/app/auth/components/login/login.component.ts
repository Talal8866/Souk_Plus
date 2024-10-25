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

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      pass: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      type: new FormControl(this.type)
    });
    this.getRole(event);
  }

  getRole(event: any) {
    this.type = event.value;
  }

  Submit() {
    if (this.type === 'User') {
      const model = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.pass,
      };
      this.service.loginuser_service(model).subscribe(
        (res: any) => {
          this.service.setToken(res.token);
          this.service.setCurrentUser(res.user);
          alert('Success');
          console.log(res);
          this.routes.navigate(['/client-details']);
        },
        err => {
          console.error(err);
        }
      );
    } else {
      const model = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.pass,
      };
      this.service.loginshop_service(model).subscribe(
        (res: any) => {
          this.service.setToken(res.token);
          this.service.setCurrentUser(res.user);
          alert('Success');
          console.log(res);
          this.routes.navigate(['/edit-profile']);
        },
        err => {
          console.error(err);
        }
      );
    }
  }
}
