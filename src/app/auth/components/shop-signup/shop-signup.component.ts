import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service.service';

@Component({
  selector: 'app-shop-signup',
  templateUrl: './shop-signup.component.html',
  styleUrls: ['./shop-signup.component.css']
})
export class ShopSignupComponent {
  constructor(private routes: Router, private service: AuthServiceService) { }

  @Input() categories: any[] = [];
  shopForm!: FormGroup;
  imageUrl: string | ArrayBuffer | null = null;

  ngOnInit() {
    this.shopForm = new FormGroup({
      shopname: new FormControl(null, [Validators.required]),
      shopcategory: new FormControl(null, [Validators.required],),
      shopemail: new FormControl(null, [Validators.required, Validators.email]),
      shopaddress: new FormControl(null, [Validators.required]),
      shopnumber: new FormControl(null, [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]),
      pass: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmpass: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    })
  }

  Submit2() {
    const model = {
      name: this.shopForm.value.shopname,
      shopCategory: this.shopForm.value.shopcategory,
      shopemail: this.shopForm.value.shopemail,
      address: this.shopForm.value.shopaddress,
      shopNumber: this.shopForm.value.shopnumber,
      password: this.shopForm.value.pass,
      pictures: this.shopForm.value.pass,
    }
    this.service.createshop_service(model).subscribe(res => {
      alert("success")
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(file);
    }
  }
}
