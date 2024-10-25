import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopServiceService } from 'src/app/shop/services/shop-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  constructor(private shop_service: ShopServiceService) { }

  addProductForm!: FormGroup;
  @Input() name: any;
  base64: any = '';

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      productname: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      linkedShop: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    })
  }

  submitAdd() {
    const model = {
      name: this.addProductForm.value.productname,
      description: this.addProductForm.value.description,
      price: this.addProductForm.value.price,
      linkedShop: this.addProductForm.value.linkedShop,
      pictures: this.addProductForm.value.pictures,
      category: this.addProductForm.value.category,
      quantity: this.addProductForm.value.quantity
    }
    this.shop_service.addProduct(model).subscribe((res: any) => {
      res = alert("The Product Added Successfully")
    })
  }

  getimagepath(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result
      this.addProductForm.get('image')?.setValue(this.base64)
    }
  }
}
