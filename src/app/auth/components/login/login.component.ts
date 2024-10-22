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
  type: string = "User"

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      pass: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      type: new FormControl(this.type)
    })
  }

  getRole(event: any) {
    this.type = event.value
  }

  Submit() {

    let index = this.users.findIndex(item => item.email == this.loginForm.value.email && item.pass == this.loginForm.value.pass)

    if (index !== -1) {

      if (this.type === "User") {
        const model = {
          username: this.users[index].username,
          role: this.type
        }
        this.service.loginuser_service(model).subscribe((res: any) => {
          res = alert("Success")
          console.log(res)
        })
        
      } 
      else {
        const model = {
          username: this.users[index].username,
          role: this.type
        }
        this.service.loginshop_service(model).subscribe((res: any) => {
          res = alert("Success")
          console.log(res)
        })
      }
    }
    else {
      alert("email or password is not corrert")
    }
  }
}
