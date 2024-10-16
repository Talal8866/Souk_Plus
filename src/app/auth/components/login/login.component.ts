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
  loginForm!: FormGroup;

  constructor(private routes: Router, private service: AuthServiceService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      pass: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  Submit() {
    const model = {
      email: this.loginForm.value.email,
      pass: this.loginForm.value.pass,
    }
  }

  getusers_servive(model: object){
  }


}
